import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: false,
        createdProduct: "",
        redirectToProfile: false,
        formData: "",
    });

    const { user, token } = isAuthenticated();

    // NOTE: from final-improvements
    // const [categories, setCategories] = useState([]);

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData,
    } = values;

    const init = (productId) => {
        getProduct(productId).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData(),
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    // if un-comment "...values" => all input fields will be empty value
                    // ...values,
                    categories: data,
                    formData: new FormData(),
                });
            }
        });
    };
    // NOTES: from final-improvements
    // const initCategories = () => {
    //     getCategories().then(data => {
    //         if (data.error) {
    //             setValues({ ...values, error: data.error });
    //         } else {
    //             setCategories(data);
    //         }
    //     });
    // };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    // higher order function: function return a function
    const handleChange = (name) => (event) => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = (event) => {
        // wrong typing preventDefault => error without message => cannot send request, reset form with empty values
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name,
                });
            }
        });
    };

    const newPostForm = () => (
        <form
            className="text-center p-5 mx-auto"
            action="#!"
            style={{ maxWidth: "700px" }}
            onSubmit={clickSubmit}
        >
            <p className="h4 mb-4">Create product</p>

            <div className="input-group mb-4">
                <label className="my-auto mr-2">Image</label>
                <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*" />
            </div>

            <input
                className="form-control mb-4"
                placeholder="Name"
                onChange={handleChange("name")}
                type="text"
                value={name}
            />

            <textarea
                onChange={handleChange("description")}
                placeholder="Descriptiopn"
                className="form-control mb-4"
                value={description}
            />

            <input
                className="form-control mb-4"
                placeholder="Price"
                onChange={handleChange("price")}
                type="number"
                value={price}
            />

            <select onChange={handleChange("category")} className="form-control custom-select mb-4">
                <option>Select category</option>
                {categories &&
                    categories.map((cat, index) => (
                        <option key={index} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
            </select>

            <select onChange={handleChange("shipping")} className="form-control custom-select mb-4">
                <option>Select shipping</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>

            <input
                onChange={handleChange("quantity")}
                type="number"
                className="form-control custom-select mb-4"
                placeholder="Purchased quantity"
                value={quantity}
            />

            <button className="btn btn-info btn-block my-4" type="submit">
                UPDATE
            </button>

            <p>
                Back to <Link to="/admin/products">mange products</Link>
            </p>
        </form>
    );

    const showError = (error) => (
        <div
            className="alert alert-danger mt-5 mx-auto"
            style={{ display: error ? "" : "none", maxWidth: "700px" }}
        >
            <i className="fas fa-exclamation-circle"></i> {error}
        </div>
    );

    const showSuccess = (createdProduct) => (
        <div
            className="alert alert-info mt-5 mx-auto"
            style={{ display: createdProduct ? "" : "none", maxWidth: "700px" }}
        >
            <i className="fas fa-check-circle"></i> {`${createdProduct} is created successfully!`}
        </div>
    );

    const showLoading = (loading) =>
        loading && (
            <div className="d-flex justify-content-center mt-5">
                <div
                    className="spinner-border text-danger fast"
                    role="status"
                    style={{ width: "5rem", height: "5rem" }}
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/dashboard" />;
            }
        }
    };

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product`}
        >
            {showLoading(loading)}
            {showSuccess(createdProduct)}
            {showError(error)}
            {newPostForm()}
            {redirectUser()}
        </Layout>
    );
};

export default UpdateProduct;
