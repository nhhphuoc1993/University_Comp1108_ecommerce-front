import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import { API } from "../config";

const Card2 = ({
    cardStyle = {},
    cardClass = "",
    cardImgStyle = {},
    viewProductBtnStyle = {},
    addToCartBtnStyle = {},
    removeProductBtnStyle = {},
    groupBtnStyle = {},
    product = {},
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = (f) => f, // default value of function
    run = undefined, // default value of undefined
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton, viewProductBtnStyle) =>
        showViewProductButton && (
            <Link
                to={`/product/${product._id}`}
                class="btn btn-md btn-cyan"
                style={viewProductBtnStyle}
            >
                View Product
            </Link>
        );

    const addToCart = () => {
        // product has already existed in the props
        // addItem(product, () => {
        //     setRedirect(true);
        // });
        // OR
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = (showAddToCartButton, addToCartBtnStyle) =>
        showAddToCartButton && (
            <button onClick={addToCart} className="btn btn-md btn-pink" style={addToCartBtnStyle}>
                Add to cart
            </button>
        );

    const showRemoveButton = (showRemoveProductButton, removeProductBtnStyle) =>
        showRemoveProductButton && (
            <button
                onClick={() => {
                    removeItem(product._id);
                    setRun(!run); // run useEffect in parent Cart
                }}
                className="btn btn-md btn-danger"
                style={removeProductBtnStyle}
            >
                Remove product
            </button>
        );

    const showStock = (quantity) =>
        quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock</span>
        );

    const handleChange = (productId) => (event) => {
        setRun(!run); // run useEffect in parent Cart
        // make sure the quantity value is always 1
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = (cartUpdate) =>
        cartUpdate && (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        value={count}
                        onChange={handleChange(product._id)}
                    />
                </div>
            </div>
        );
    return (
        <div className={`card rounded ` + cardClass} style={cardStyle}>
            {shouldRedirect(redirect)}
            <div className="view">
                <img
                    src={`${API}/product/photo/${product._id}`}
                    className="card-img-top"
                    alt="product"
                    style={cardImgStyle}
                />
                <Link to={`/product/${product._id}`}>
                    <div className="mask rgba-white-slight"></div>
                </Link>
            </div>
            <div className="card-body text-center">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">{product.description.substring(0, 100)}</p>
                <p className="card-text">${product.price}</p>
                <p className="card-text">Category: {product.category && product.category.name}</p>
                <p className="card-text">Added on {moment(product.createdAt).fromNow()}</p>
                <p className="card-text">{showStock(product.quantity)}</p>
                <div className={groupBtnStyle}>
                    {showViewButton(showViewProductButton, viewProductBtnStyle)}
                    {showAddToCart(showAddToCartButton, addToCartBtnStyle)}
                    {showRemoveButton(showRemoveProductButton, removeProductBtnStyle)}
                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
        </div>
    );
};

export default Card2;
