import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = (productId) => {
        deleteProduct(productId, user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const showProductsLength = () => {
        if (products.length > 0) {
            return (
                <h2 className="text-danger display-4 text-center">
                    Total products: {products.length}
                </h2>
            );
        } else {
            return <h2 className="text-danger display-4 text-center">No order!</h2>;
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products Page"
            description="Perform CRUD on products"
            className="col-11 mx-auto my-5"
        >
            {showProductsLength()}
            <div class="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Shipping</th>
                            <th scope="col">Sold</th>
                            <th scope="col" style={{ width: "130px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => {
                            console.log(p);
                            return (
                                <tr key={i}>
                                    <th className="align-middle" scope="row">
                                        {i + 1}
                                    </th>
                                    <td className="align-middle">{p.name}</td>
                                    <td className="align-middle">{p.category.name}</td>
                                    <td className="align-middle">{p.description}</td>
                                    <td className="align-middle">{p.price}</td>
                                    <td className="align-middle">{p.quantity}</td>
                                    <td className="align-middle">
                                        {p.shipping === true ? "Yes" : "No"}
                                    </td>
                                    <td className="align-middle">{p.sold}</td>
                                    <td>
                                        <Link to={`/admin/product/update/${p._id}`}>
                                            <button
                                                type="button"
                                                class="btn btn-success p-0"
                                                style={{
                                                    borderRadius: "40px",
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <i
                                                    class="fas fa-pencil-alt fa-lg"
                                                    aria-hidden="true"
                                                ></i>
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            class="btn btn-danger p-0"
                                            style={{
                                                borderRadius: "40px",
                                                width: "40px",
                                                height: "40px",
                                            }}
                                            onClick={() => destroy(p._id)}
                                        >
                                            <i class="fas fa-trash fa-lg" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default ManageProducts;
