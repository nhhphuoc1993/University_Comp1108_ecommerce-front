import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import Card2 from "./Card2";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState({});

    const loadSingleProduct = (productId) => {
        read(productId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related product
                listRelated(data._id).then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProducts(data);
                    }
                });
            }
        });
    };

    // wrap id from param when component mount
    useEffect(() => {
        // can get props due to react router doom
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        // props (check video 107 for detail explanantion) => url is changed but the page is not re-rendered => add props into useEffect so that the change in props will trigger useEffect to update state and re-render the page
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div
                className="row mt-4 mb-2"
                style={{ marginRight: "auto", marginLeft: "auto", maxWidth: "1600px" }}
            >
                {/* {JSON.stringify(product)} */}
                <div className="col-9">
                    <h3 className="mb-0">
                        <strong>Details</strong>
                    </h3>
                    {product && product.description && (
                        <Card2
                            product={product}
                            cardClass="mt-4 border-0"
                            cardBodyClass="text-left px-0"
                            cardBodyTitleStyle={{ fontSize: "xx-large" }}
                            cardBodyTextStyle={{ fontSize: "x-large" }}
                            showViewProductButton={false}
                            addToCartBtnClass="btn-lg btn-pink rounded"
                            addToCartBtnStyle={{
                                fontWeight: "bold",
                                width: "175px",
                                marginLeft: "0px",
                            }}
                            cardImgStyle={{ width: "320px", height: "400px" }}
                            cardBodyStyle={{ height: "410px" }}
                        />
                    )}
                </div>
                <div className="col-3" style={{ paddingLeft: "60px" }}>
                    <h3 className="mb-0">
                        <strong>Related Products</strong>
                    </h3>
                    {relatedProducts.map((product, i) => (
                        <Card2
                            key={i}
                            product={product}
                            cardClass="my-4"
                            cardStyle={{ width: "320px", height: "625px" }}
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
            </div>
        </Layout>
    );
};

export default Product;
