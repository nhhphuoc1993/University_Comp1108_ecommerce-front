import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Card2 from "./Card2";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
    const [items, setItems] = useState([]);
    // const [cartSize, setCartSize] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        // console.log("MAX DEPTH ...");
        setItems(getCart());
        // use [run] instead of [items] to avoid error (section 108)
    }, [run]);

    const showItems = (items) => {
        return (
            <Fragment>
                <h3>
                    <strong>{`${items.length}`} items in your cart!</strong>
                </h3>
                <div className="row">
                    {items.map((product, i) => (
                        <Card2
                            key={i}
                            product={product}
                            cardClass="m-3"
                            cardStyle={{ width: "360px", height: "700px" }}
                            viewProductBtnClass="btn-sm btn-cyan rounded"
                            viewProductBtnStyle={{ fontWeight: "bold", width: "145px" }}
                            removeProductBtnClass="btn-sm btn-pink rounded"
                            removeProductBtnStyle={{ fontWeight: "bold", width: "145px" }}
                            cardImgStyle={{ width: "100%", height: "410px" }}
                            groupBtnStyle="d-flex align-content-center justify-content-around flex-wrap"
                            showAddToCartButton={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                            setRun={setRun}
                            run={run}
                            cardBodyTextStyle={{ fontSize: "20px" }}
                            cardBodyTitleStyle={{ height: "55px" }}
                            showDescription={false}
                            showCategory={false}
                            showAddedOn={false}
                        />
                    ))}
                </div>
            </Fragment>
        );
    };

    const noItemsMessage = () => (
        <h3>
            <strong>Your cart is empty! </strong>
            <Link to="/shop">Continue shopping!</Link>
        </h3>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Checkout now!"
            className="container-fluid mt-4 mb-2"
        >
            <div
                className="row"
                style={{ marginRight: "auto", marginLeft: "auto", maxWidth: "1500px" }}
            >
                <div className="col-8">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-4">
                    <div className="row mb-2">
                        <h3>
                            <strong>Checkout details!</strong>
                        </h3>
                    </div>
                    {/* use [run] in Checkout component in order to refresh the page after making the cart empty (section 108) */}
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
