import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import Card2 from "./Card2";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] },
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(2);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filterResults, setFilterResults] = useState([]);

    // load categories and set form data
    const init = () => {
        getCategories().then((data) => {
            if (data.error) {
                setError({ error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilterResults = (newFilters) => {
        // console.log("Show componenet/loadFilterResults/newFilters", newFilters);
        getFilteredProducts(skip, limit, newFilters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilterResults(data.products);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                // console.log("Shop component/loadMore/data.size,limit", data.size, limit);
                setFilterResults([...filterResults, ...data.products]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        // console.log("Shop component/loadMoreButton/size,limit", size, limit);
        return (
            size > 0 &&
            size >= limit && (
                <button
                    onClick={loadMore}
                    className="btn btn-warning btn-sm"
                    style={{
                        fontSize: "small",
                        fontWeight: "bold",
                        borderRadius: "20px",
                        width: "100px",
                    }}
                >
                    More
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilterResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("Shop componenet/filters,filterBy ", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilterResults(myFilters.filters);

        setMyFilters(newFilters);
    };

    const handlePrice = (value) => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div
                className="row mt-4"
                style={{ marginRight: "auto", marginLeft: "auto", maxWidth: "1700px" }}
            >
                <div className="col-2">
                    <h5>
                        <strong>Categories</strong>
                    </h5>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={(filters) => handleFilters(filters, "category")}
                        />
                    </ul>
                    {/* {JSON.stringify(categories)} */}

                    <h5>
                        <strong>Price ranges</strong>
                    </h5>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={(filters) => handleFilters(filters, "price")}
                        />
                    </div>
                    {/* {JSON.stringify(prices)} */}
                </div>

                <div className="col-10">
                    <h5>
                        <strong>All Products</strong>
                    </h5>
                    <div className="row">
                        {filterResults.length > 0 ? (
                            filterResults.map((product, i) => (
                                <Card2
                                    key={i}
                                    product={product}
                                    cardClass="m-3"
                                    cardStyle={{ width: "320px", height: "625px" }}
                                    groupBtnStyle="d-flex align-content-center justify-content-around flex-wrap"
                                    viewProductBtnClass="btn-sm btn-cyan rounded"
                                    viewProductBtnStyle={{ fontWeight: "bold", width: "125px" }}
                                    addToCartBtnClass="btn-sm btn-pink rounded"
                                    addToCartBtnStyle={{ fontWeight: "bold", width: "125px" }}
                                    cardImgStyle={{ width: "100%", height: "400px" }}
                                    cardBodyTextStyle={{ fontSize: "20px" }}
                                    cardBodyTitleStyle={{ height: "55px" }}
                                    showDescription={false}
                                    showCategory={false}
                                    showAddedOn={false}
                                />
                            ))
                        ) : (
                            <h4 style={{ paddingLeft: "15px" }}>
                                <em>Not find any product yet!</em>
                            </h4>
                        )}
                    </div>
                    {/* {JSON.stringify(myFilters)} */}
                    {/* {JSON.stringify(filterResults)} */}
                    <div className="row mb-3 justify-content-center">{loadMoreButton()}</div>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
