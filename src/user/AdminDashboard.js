import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role },
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-4">
                <h3 className="card-header">Profile</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Name: </strong>
                        {name}
                    </li>
                    <li className="list-group-item">
                        <strong>Email: </strong>
                        {email}
                    </li>
                    <li className="list-group-item">
                        <strong>Account type: </strong>
                        {role === 1 ? "Admin" : "Normal user"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="User Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid my-4"
        >
            <div className="row">
                <div className="col-3">{adminLinks()}</div>
                <div className="col-9">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
