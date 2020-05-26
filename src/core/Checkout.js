import React, { useState, useEffect, Fragment } from "react";
import { getBraintreeClientToken, processPayment, createOrder } from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: "",
    });
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const userAddress = isAuthenticated() && isAuthenticated().user.address;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then((data) => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = (event) => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () =>
        isAuthenticated() ? (
            <Fragment>{showDropIn()}</Fragment>
        ) : (
            <div className="alert alert-info" role="alert">
                Please <Link to="/shop">signin</Link> to proceed checkout!
            </div>
        );

    let deliveryAddress = data.address ? data.address : userAddress;

    const buy = () => {
        setData({ loading: true });
        // send the nonce (payment method) to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then((data) => {
                // console.log(data);
                nonce = data.nonce;
                // once having nonce (card type and number) => send nonce as paymentMethodNonce to the backend and also total to be charged
                // console.log("send nonce and total to process:", nonce, getTotal(products));
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products),
                };

                processPayment(userId, token, paymentData)
                    .then((response) => {
                        // console.log("Checkout componenet/processPayment", response);
                        // setData({ ...data, success: response.success });
                        // create order
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress,
                        };

                        createOrder(userId, token, createOrderData)
                            .then((response) => {
                                // console.log("Checkout componenet/createOrder", response);

                                // empty cart
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    // console.log("payment success and empty cart");
                                    setData({ loading: false, success: true });
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch((error) => {
                // console.log("dropin error:", error);
                setData({ ...data, error: error.message });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })} className="w-100">
            {data.clientToken !== null && products.length > 0 ? (
                <Fragment>
                    <div className="form-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: "vault",
                            },
                        }}
                        onInstance={(instance) => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success rounded-circle">
                        Pay
                    </button>
                </Fragment>
            ) : null}
        </div>
    );

    const showError = (error) =>
        isAuthenticated() && (
            <div
                className="alert alert-danger"
                role="alert"
                style={{ display: error ? "" : "none" }}
            >
                <i className="fas fa-exclamation-circle fa-lg"></i> {error}
            </div>
        );

    const showSuccess = (success) => (
        <div
            className="alert alert-success"
            role="alert"
            style={{ display: success ? "" : "none" }}
        >
            <i className="far fa-check-circle fa-lg"></i> Payment Successful!{" "}
            <Link to="/shop">Continue shopping!</Link>
        </div>
    );

    const showLoading = (loading) =>
        loading && (
            <div
                className="spinner-border text-danger"
                style={{ width: "100px", height: "100px" }}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        );
    return (
        <Fragment>
            <div className="row mb-2">
                <h3>
                    <u>Total:</u> <strong>${getTotal()}</strong>
                </h3>
            </div>
            <div className="row">
                {/* {JSON.stringify(products)} */}
                {showLoading(data.loading)}
                {showSuccess(data.success)}
                {showError(data.error)}
                {showCheckout()}
            </div>
        </Fragment>
    );
};

export default Checkout;
