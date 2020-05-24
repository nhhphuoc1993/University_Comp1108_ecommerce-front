import React, { useState, useEffect, Fragment } from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h2 className="text-danger display-4 text-center">Total orders: {orders.length}</h2>
            );
        } else {
            return <h2 className="text-danger display-4 text-center">No order!</h2>;
        }
    };

    const handleStatusChange = (event, orderId) => {
        updateOrderStatus(user._id, token, orderId, event.target.value).then((data) => {
            if (data.error) {
                console.log("Update order status");
            } else {
                loadOrders();
            }
        });
    };

    const showStatus = (o) => (
        <div className="form-group mb-0">
            <h5>
                <strong>Status:</strong> <span className="spring-warmth-gradient">{o.status} </span>
            </h5>
            <select
                className="form-control custom-select"
                onChange={(e) => handleStatusChange(e, o._id)}
            >
                <option>Update order status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout
            title="Orders"
            description={`G'day ${user.name}, you can manage all the orders here`}
            className="col-8 mx-auto my-5"
        >
            {/* {JSON.stringify(orders)} */}
            {showOrdersLength()}
            {orders.map((o, oIndex) => {
                return (
                    <div key={oIndex}>
                        <hr className="my-4" style={{ border: "0.5px solid red" }} />
                        <h2>
                            <strong>Order ID:</strong> {o._id} <strong>-</strong>{" "}
                            {moment(o.createdAt).fromNow()}
                        </h2>
                        <ul className="list-group">
                            <li className="list-group-item" style={{ borderBottom: "none" }}>
                                {showStatus(o)}
                            </li>
                            <li className="list-group-item py-0" style={{ borderBottom: "none" }}>
                                <div class="accordion" id={"orderDetailsAccordion_" + oIndex}>
                                    <div class="card z-depth-0 bordered">
                                        <div
                                            class="card-header cloudy-knoxville-gradient"
                                            id={"orderDetailsAccordion_" + oIndex + "_headingOne"}
                                        >
                                            <h5 class="mb-0">
                                                <button
                                                    class="btn btn-link btn-block text-left p-0"
                                                    style={{ fontSize: "medium" }}
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target={
                                                        "#orderDetailsAccordion_" +
                                                        oIndex +
                                                        "_collapseOne"
                                                    }
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Details
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            id={"orderDetailsAccordion_" + oIndex + "_collapseOne"}
                                            class="collapse show"
                                            aria-labelledby={
                                                "orderDetailsAccordion_" + oIndex + "_headingOne"
                                            }
                                            data-parent={"#orderDetailsAccordion_" + oIndex}
                                        >
                                            <div class="card-body">
                                                {o.products.map((p, pIndex) => {
                                                    return (
                                                        <div key={pIndex}>
                                                            {pIndex > 0 && <hr />}
                                                            <h5>
                                                                <strong>Ordered by:</strong>{" "}
                                                                {o.user.name}
                                                            </h5>
                                                            <h5>
                                                                <strong>Total price:</strong> $
                                                                {o.amount}
                                                            </h5>
                                                            <h5>
                                                                <strong>Delivery address:</strong>{" "}
                                                                {o.address ? (
                                                                    o.address
                                                                ) : (
                                                                    <i>Default buyer address</i>
                                                                )}
                                                            </h5>
                                                            <h5>
                                                                <strong>Transaction ID:</strong>{" "}
                                                                {o.transaction_id}
                                                            </h5>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div class="accordion" id={"puchasedItemsAccordion_" + oIndex}>
                                    <div class="card z-depth-0 bordered">
                                        <div
                                            class="card-header cloudy-knoxville-gradient"
                                            id={"puchasedItemsAccordion_" + oIndex + "_headingOne"}
                                        >
                                            <h5 class="mb-0">
                                                <button
                                                    class="btn btn-link btn-block text-left p-0"
                                                    style={{ fontSize: "medium" }}
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target={
                                                        "#puchasedItemsAccordion_" +
                                                        oIndex +
                                                        "_collapseOne"
                                                    }
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    {o.products.length} products
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            id={"puchasedItemsAccordion_" + oIndex + "_collapseOne"}
                                            class="collapse show"
                                            aria-labelledby={
                                                "puchasedItemsAccordion_" + oIndex + "_headingOne"
                                            }
                                            data-parent={"#puchasedItemsAccordion_" + oIndex}
                                        >
                                            <div class="card-body">
                                                {o.products.map((p, pIndex) => {
                                                    return (
                                                        <div key={pIndex}>
                                                            {pIndex > 0 && <hr />}
                                                            <h5>
                                                                <strong>ID: </strong>
                                                                {p._id}
                                                            </h5>
                                                            <h5>
                                                                <strong>Name: </strong>
                                                                {p.name}
                                                            </h5>
                                                            <h5>
                                                                <strong>Single price: </strong>$
                                                                {p.price}
                                                            </h5>
                                                            <h5>
                                                                <strong>Bought quantity: </strong>$
                                                                {p.count}
                                                            </h5>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                );
            })}
        </Layout>
    );
};

export default Orders;
