import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and info from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name }).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryForm = () => (
        <form
            className="text-center p-5 mx-auto"
            action="#!"
            style={{ maxWidth: "700px" }}
            onSubmit={clickSubmit}
        >
            <p className="h4 mb-4">Create category</p>

            <input
                className="form-control mb-4"
                placeholder="Name"
                onChange={handleChange}
                type="text"
                value={name}
                autoFocus
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
            <i className="fas fa-exclamation-circle"></i> Category should be unique!
        </div>
    );

    const showSuccess = (success) => (
        <div
            className="alert alert-info mt-5 mx-auto"
            style={{ display: success ? "" : "none", maxWidth: "700px" }}
        >
            <i className="fas fa-check-circle"></i> {name} is created!
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`G'day ${user.name}, ready to add a new category`}
            className="container col-md-8 offset-md-2"
        >
            {showSuccess(success)}
            {showError(error)}
            {newCategoryForm()}
        </Layout>
    );
};

export default AddCategory;
