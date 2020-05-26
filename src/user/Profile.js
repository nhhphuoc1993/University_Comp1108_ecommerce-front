import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import { MDBInput } from "mdbreact";

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = (userId) => {
        // console.log(userId);
        read(userId, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: "" });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    // wrap name and then wrap the event
    const handleChange = (name) => (e) => {
        setValues({ ...values, error: "", [name]: e.target.value });
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then((data) => {
            if (data.error) {
                console.log(data.error);
                setValues({ ...values, error: data.error, success: false });
            } else {
                updateUser(data, () => {
                    setValues({ ...values, name: data.name, email: data.email, success: true });
                });
            }
        });
    };

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to="/user/dashboard" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form className="text-center p-5 mx-auto" action="#!" style={{ maxWidth: "700px" }}>
            <p className="h4 mb-4">Update profile</p>

            <div className="form-group text-left">
                <label>Name</label>
                <input
                    className="form-control mb-4"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    type="text"
                    value={name}
                />
            </div>

            <div className="form-group text-left">
                <label>Email</label>
                <input
                    className="form-control mb-4"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                    disabled
                />
            </div>

            <div className="form-group text-left">
                <label>Password</label>
                <input
                    className="form-control mb-4"
                    placeholder="New password"
                    onChange={handleChange("password")}
                    type="password"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-info btn-block my-4" type="submit">
                UPDATE
            </button>

            <p>
                Back to <Link to="/user/dashboard">user dashboard</Link>
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

    return (
        <Layout title="Profile Page" description="Update your profile" className="container-fluid">
            {showError(error)}
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};
export default Profile;
