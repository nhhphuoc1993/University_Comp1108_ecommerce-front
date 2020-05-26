import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const UserDashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role, address },
        token,
    } = isAuthenticated();
    // const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then((data) => {
            // console.log(data);
            if (data.error) {
                console.log(data.error);
            } else setHistory(data);
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
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
                    <li className="list-group-item">
                        <strong>Address: </strong>
                        {address}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = (history) => {
        return (
            <div className="card mb-4">
                <h3 className="card-header">Purchased history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div key={i}>
                                    {i > 0 && <hr />}
                                    <h6>
                                        <strong>Order ID: </strong>
                                        {h._id}
                                    </h6>
                                    <h6>
                                        <strong>Purchased date: </strong>
                                        {moment(h.createdAt).fromNow()}
                                    </h6>
                                    <h6>
                                        <strong>Status: </strong>
                                        {h.status}
                                    </h6>
                                    <h6>
                                        <strong>Total price: </strong>${h.amount}
                                    </h6>
                                    <h6>
                                        <strong>Delivery address: </strong>
                                        {h.address ? h.address : "N/A"}
                                    </h6>
                                    <div class="accordion" id={"puchasedItemsAccordion_" + i}>
                                        <div class="card z-depth-0 bordered">
                                            <div
                                                class="card-header cloudy-knoxville-gradient"
                                                id={"puchasedItemsAccordion_" + i + "_headingOne"}
                                            >
                                                <h5 class="mb-0">
                                                    <button
                                                        class="btn btn-link btn-block text-left p-0"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target={
                                                            "#puchasedItemsAccordion_" +
                                                            i +
                                                            "_collapseOne"
                                                        }
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Purchased items
                                                    </button>
                                                </h5>
                                            </div>
                                            <div
                                                id={"puchasedItemsAccordion_" + i + "_collapseOne"}
                                                class="collapse show"
                                                aria-labelledby={
                                                    "puchasedItemsAccordion_" + i + "_headingOne"
                                                }
                                                data-parent={"#puchasedItemsAccordion_" + i}
                                            >
                                                <div class="card-body">
                                                    {h.products.map((p, i) => {
                                                        return (
                                                            <div key={i}>
                                                                {i > 0 && <hr />}
                                                                <h6>
                                                                    <strong>Name: </strong>
                                                                    {p.name}
                                                                </h6>
                                                                <h6>
                                                                    <strong>Single price: </strong>$
                                                                    {p.price}
                                                                </h6>
                                                                <h6>
                                                                    <strong>
                                                                        Bought quantity:{" "}
                                                                    </strong>
                                                                    ${p.count}
                                                                </h6>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="User Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid mt-4"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
