import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card2 from "./Card2";
import Search from "./Search";
import { MDBRow } from "mdbreact";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Home Page"
            description="Node React Ecommerce App"
            className="container-fluid"
        >
            <Search />

            <MDBRow style={{ backgroundColor: "#eff6fa" }}>
                <div className="w-100 text-center text-primary">
                    <h2 className="mt-4 mb-4 font-weight-bold">
                        <u>New Arrivals</u>
                    </h2>
                </div>
                <div
                    className="d-flex flex-wrap align-content-center justify-content-center"
                    style={{ marginRight: "auto", marginLeft: "auto", maxWidth: "1700px" }}
                >
                    {productsByArrival.map((product, i) => (
                        <Card2
                            key={i}
                            product={product}
                            cardClass="m-3"
                            cardStyle={{ width: "320px", height: "630px" }}
                            groupBtnStyle="d-flex align-content-center justify-content-around flex-wrap"
                            viewProductBtnClass="btn-sm btn-cyan rounded"
                            viewProductBtnStyle={{ fontWeight: "bold", width: "125px" }}
                            addToCartBtnClass="btn-sm btn-pink rounded"
                            addToCartBtnStyle={{ fontWeight: "bold", width: "125px" }}
                            cardViewStyle={{ width: "100%", height: "400px" }}
                            cardBodyTextStyle={{ fontSize: "20px" }}
                            cardBodyTitleStyle={{ height: "55px" }}
                            showDescription={false}
                            showCategory={false}
                            showAddedOn={false}
                        />
                    ))}
                </div>
            </MDBRow>

            <MDBRow style={{ backgroundColor: "#fff7f8" }} className="mb-2">
                <div className="w-100 text-center mb-3">
                    <h2 className="mt-4 mb-4 font-weight-bold text-success">
                        <u>Best Sellers</u>
                    </h2>
                </div>
                <div
                    className="d-flex flex-wrap align-content-center justify-content-center"
                    style={{ marginRight: "auto", marginLeft: "auto", maxWidth: "1700px" }}
                >
                    {productsBySell.map((product, i) => (
                        <Card2
                            key={i}
                            product={product}
                            cardClass="m-3"
                            cardStyle={{ width: "320px", height: "630px" }}
                            groupBtnStyle="d-flex align-content-center justify-content-around flex-wrap"
                            viewProductBtnClass="btn-sm btn-cyan rounded"
                            viewProductBtnStyle={{ fontWeight: "bold", width: "125px" }}
                            addToCartBtnClass="btn-sm btn-pink rounded"
                            addToCartBtnStyle={{ fontWeight: "bold", width: "125px" }}
                            cardViewStyle={{ width: "100%", height: "400px" }}
                            cardBodyTextStyle={{ fontSize: "20px" }}
                            cardBodyTitleStyle={{ height: "55px" }}
                            showDescription={false}
                            showCategory={false}
                            showAddedOn={false}
                        />
                    ))}
                </div>
            </MDBRow>
        </Layout>
    );
};

export default Home;
