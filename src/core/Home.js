import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
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
                <div className="d-flex flex-wrap align-content-center justify-content-center">
                    {productsByArrival.map((product, i) => (
                        <Card2
                            key={i}
                            product={product}
                            cardClass="m-3"
                            cardStyle={{ width: "400px", height: "750px" }}
                            viewProductBtnStyle={{ fontSize: "small", width: "145px" }}
                            addToCartBtnStyle={{ fontSize: "small", width: "145px" }}
                            cardImgStyle={{ width: "100%", height: "450px" }}
                            groupBtnStyle="d-flex align-content-center justify-content-around flex-wrap pb-4"
                        />
                    ))}
                </div>
            </MDBRow>

            <MDBRow style={{ backgroundColor: "#fff7f8" }}>
                <div className="w-100 text-center">
                    <h2 className="mt-4 mb-4 font-weight-bold text-success">
                        <u>Best Sellers</u>
                    </h2>
                </div>
                <div className="d-flex flex-wrap align-content-center justify-content-center">
                    {productsBySell.map((product, i) => (
                        <Card2
                            key={i}
                            product={product}
                            cardClass="m-3"
                            cardStyle={{ width: "400px", height: "750px" }}
                            viewProductBtnStyle={{ fontSize: "small", width: "145px" }}
                            addToCartBtnStyle={{ fontSize: "small", width: "145px" }}
                            cardImgStyle={{ width: "100%", height: "450px" }}
                            groupBtnStyle="d-flex align-content-center justify-content-around flex-wrap pb-4"
                        />
                    ))}
                </div>
            </MDBRow>
        </Layout>
    );
};

export default Home;
