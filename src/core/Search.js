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
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <MDBRow>
                <h2 className="mt-4">{searchMessage(searched, results)}</h2>
                <div className="d-flex flex-wrap align-content-center justify-content-center">
                    {results.map((product, i) => (
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
            <MDBContainer fluid>
                {results && results.length > 0 ? (
                    searchedProducts(results)
                ) : (
                    <div className="text-center">
                        <h5>
                            <em>Not find any product yet!</em>
                        </h5>
                    </div>
                )}
            </MDBContainer>
        </MDBRow>
    );
};

export default Search;
