import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import { MDBInput } from "mdbreact";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });

    // destruct values to get necessary fields
    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // higher order function: function return a function
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        // prevent the browser reload
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        // always redirect, no need to worry about reset other values
                        redirectToReferrer: true,
                    });
                });
            }
        });
    };

    const singinForm = () => (
        <form className="text-center p-5 mx-auto" action="#!" style={{ maxWidth: "700px" }}>
            <p className="h4 mb-4">Sign in</p>

            <MDBInput
                label="Email"
                onChange={handleChange("email")}
                type="email"
                className="form-control mb-4"
                value={email}
            />

            <MDBInput
                label="Password"
                type="password"
                className="form-control mb-4"
                onChange={handleChange("password")}
                value={password}
            />

            <button onClick={clickSubmit} className="btn btn-info btn-block my-4" type="submit">
                Sign in
            </button>

            <p>
                Not a member? <Link to="/signup">Register</Link>
            </p>
        </form>
    );

    // use 2 brackets: https://stackoverflow.com/questions/47950833/react-why-is-double-brace-syntax-style-required-for-inline-styles
    const showError = (error) => (
        <div
            className="alert alert-danger mt-5 mx-auto"
            style={{ display: error ? "" : "none", maxWidth: "700px" }}
        >
            <i className="fas fa-exclamation-circle"></i> {error}
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
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin Page"
            description="Signin to Node React Ecommerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading(loading)}
            {showError(error)}
            {singinForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};

export default Signin;
