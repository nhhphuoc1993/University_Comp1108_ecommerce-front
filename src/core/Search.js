import React, { useState, useEffect, Fragment } from "react";
import Card2 from "./Card2";
import { getCategories, list } from "./apiCore";
import { MDBContainer, MDBRow, MDBCol, MDBFormInline, MDBBtn } from "mdbreact";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false,
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        if (search) {
            list({ search: search || undefined, category: category }).then((response) => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setData({ ...data, results: response, searched: true });
                }
            });
        }
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const handleChange = (name) => (event) => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products!`;
        }
        if (searched && results.length < 1) {
            return `No product found!`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <MDBRow>
                <div className="w-100 text-center">
                    <h4>
                        <em>{searchMessage(searched, results)}</em>
                    </h4>
                </div>
                <div className="d-flex flex-wrap align-content-center justify-content-center">
                    {results.map((product, i) => (
                        <Card2
                            key={i}
                            product={product}
                            cardClass="m-3"
                            cardStyle={{ width: "320px", height: "670px" }}
                            viewProductBtnClass="btn-sm btn-cyan rounded"
                            viewProductBtnStyle={{ fontWeight: "bold", width: "125px" }}
                            addToCartBtnClass="btn-sm btn-pink rounded"
                            addToCartBtnStyle={{ fontWeight: "bold", width: "125px" }}
                            cardImgStyle={{ width: "100%", height: "370px" }}
                            groupBtnStyle="d-flex align-content-center justify-content-around flex-wrap"
                        />
                    ))}
                </div>
            </MDBRow>
        );
    };

    const searchForm = () => (
        <MDBFormInline className="md-form mr-auto " onSubmit={searchSubmit}>
            <MDBCol md="3">
                <select
                    className="browser-default custom-select w-100 rounded-pill border-secondary"
                    style={{ fontSize: "large" }}
                    onChange={handleChange("category")}
                >
                    <option value="All">All categories</option>
                    {categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </MDBCol>
            <MDBCol md="7">
                <input
                    className="form-control form-control-lg w-100"
                    type="text"
                    placeholder="Search by name"
                    aria-label="Search"
                    onChange={handleChange("search")}
                />
            </MDBCol>
            <MDBCol md="2">
                <MDBBtn
                    gradient="aqua"
                    rounded
                    type="submit"
                    className="btn btn-md w-100"
                    style={{ fontSize: "medium" }}
                >
                    Search
                </MDBBtn>
            </MDBCol>
        </MDBFormInline>
    );

    return (
        <MDBRow>
            <MDBContainer>{searchForm()}</MDBContainer>
            <MDBContainer
                fluid
                style={{ marginRight: "auto", marginLeft: "auto", maxWidth: "1700px" }}
            >
                {results && results.length > 0 ? (
                    searchedProducts(results)
                ) : (
                    <div className="text-center">
                        <h4>
                            <em>Not find any product yet!</em>
                        </h4>
                    </div>
                )}
            </MDBContainer>
        </MDBRow>
    );
};

export default Search;
