import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
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
        error: "",
        // to inform user
        createdProduct: "",
        redirectToProfile: false,
        formData: "",
    });

    const { user, token } = isAuthenticated();

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

    // load categories and set form data
    const init = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, categories: data, formData: new FormData() });
            }
        });
    };

    useEffect(() => {
        init();
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

        createProduct(user._id, token, formData).then((data) => {
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

            <div class="input-group mb-4">
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
                CREATE
            </button>

            <p>
                Back to <Link to="/admin/dashboard">admin dashboard</Link>
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

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading(loading)}
                    {showSuccess(createdProduct)}
                    {showError(error)}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
