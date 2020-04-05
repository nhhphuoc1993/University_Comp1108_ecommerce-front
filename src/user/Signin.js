import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "phuoc4@gmail.com",
        password: "12345678",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });

    // destruct values to get necessary fields
    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // higher order function: function return a function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        // prevent the browser reload
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
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
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    // use 2 brackets: https://stackoverflow.com/questions/47950833/react-why-is-double-brace-syntax-style-required-for-inline-styles
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
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
            {showLoading()}
            {showError()}
            {singinForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};

export default Signin;
