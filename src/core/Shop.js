import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getCategories, getFilteredProducts } from "./apiCore";
import Card from "./Card";
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
        getCategories().then(data => {
            if (data.error) {
                setError({ error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilterResults = newFilters => {
        // console.log("Show componenet/loadFilterResults/newFilters", newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
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
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log("Shop component/loadMore/data.size,limit", data.size, limit);
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
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilterResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        console.log("Shop componenet/filters,filterBy ", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilterResults(myFilters.filters);

        setMyFilters(newFilters);
    };

    const handlePrice = value => {
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
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters => handleFilters(filters, "category")}
                        />
                    </ul>
                    {/* {JSON.stringify(categories)} */}

                    <h4>Filter by categories</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters => handleFilters(filters, "price")}
                        />
                    </div>
                    {/* {JSON.stringify(prices)} */}
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filterResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    {/* {JSON.stringify(myFilters)} */}
                    {/* {JSON.stringify(filterResults)} */}
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
