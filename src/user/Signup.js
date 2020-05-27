import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import { MDBInput } from "mdbreact";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        error: "",
        success: false,
    });

    // destruct values to get necessary fields
    const { name, email, password, address, success, error } = values;

    // higher order function: function return a function
    const handleChange = (name) => (event) => {
        setValues({ ...values, success: false, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        // prevent the browser reload
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password, address }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    address: "",
                    error: "",
                    success: true,
                });
            }
        });
    };

    const singupForm = () => (
        <form className="text-center p-5 mx-auto" action="#!" style={{ maxWidth: "700px" }}>
            <p className="h4 mb-4">Sign up</p>

            <MDBInput
                label="Name"
                className="form-control mb-4"
                onChange={handleChange("name")}
                type="text"
                value={name}
            />

            <MDBInput
                label="Email"
                className="form-control mb-4"
                onChange={handleChange("email")}
                type="email"
                value={email}
            />

            <MDBInput
                label="Password"
                className="form-control mb-4"
                onChange={handleChange("password")}
                type="password"
                value={password}
            />

            <MDBInput
                label="Address"
                className="form-control mb-4"
                onChange={handleChange("address")}
                type="text"
                value={address}
            />

            <button onClick={clickSubmit} className="btn btn-info btn-block my-4" type="submit">
                Sign up
            </button>

            <p>
                Member already? <Link to="/signin">Sign in</Link>
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

    const showSuccess = (success) => (
        <div
            className="alert alert-info mt-5 mx-auto"
            style={{ display: success ? "" : "none", maxWidth: "700px" }}
        >
            <i className="fas fa-check-circle"></i> New account is created. Please{" "}
            <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup Page"
            description="Signup to Node React Ecommerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess(success)}
            {showError(error)}
            {singupForm()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};

export default Signup;
