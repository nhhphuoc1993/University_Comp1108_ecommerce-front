import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

import user_img from "../pictures/user.svg";
import mail_img from "../pictures/mail.png";
import phone_img from "../pictures/phone.png";
import search_img from "../pictures/search.png";
import cart_img from "../pictures/cart.png";
import { getCategories, list } from "./apiCore";

const Header = ({ history }) => {
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

    const { user } = isAuthenticated();

    const header_top_bar = () => (
        <div className="top_bar">
            <div className="container">
                <div className="row">
                    <div className="col d-flex flex-row">
                        <div className="top_bar_contact_item">
                            <div className="top_bar_icon">
                                <img src={phone_img} alt="" />
                            </div>
                            +84 947 283 919
                        </div>
                        <div className="top_bar_contact_item">
                            <div className="top_bar_icon">
                                <img src={mail_img} alt="" />
                            </div>
                            <Link to="mailto:nhhphuoc1993@gmail.com">nhhphuoc1993@gmail.com</Link>
                        </div>
                        <div className="top_bar_content ml-auto">
                            <div className="top_bar_user">
                                <div className="user_icon">
                                    <img src={user_img} alt="" />
                                </div>
                                {!isAuthenticated() && (
                                    <Fragment>
                                        <div>
                                            <Link to="/signup">Register</Link>
                                        </div>
                                        <div>
                                            <Link to="/signin">Sign in</Link>
                                        </div>
                                    </Fragment>
                                )}
                                {isAuthenticated() && (
                                    <Fragment>
                                        <div>
                                            <Link to="/user/dashboard">{user.name}</Link>
                                        </div>
                                        <div>
                                            <Link
                                                to="/"
                                                onClick={() =>
                                                    signout(() => {
                                                        history.push("/");
                                                    })
                                                }
                                            >
                                                Sign out
                                            </Link>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const header_main = () => (
        <div className="header_main">
            <div className="container">
                <div className="row">
                    {/*  Logo  */}
                    <div className="col-lg-2 col-sm-3 col-3 order-1">
                        <div className="logo_container">
                            <div className="logo">
                                <Link to="/">PHT</Link>
                            </div>
                        </div>
                    </div>

                    {/*  Search  */}
                    <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                        <div className="header_search">
                            <div className="header_search_content">
                                <div className="header_search_form_container">
                                    <form action="#" className="header_search_form clearfix">
                                        <input
                                            type="search"
                                            required="required"
                                            className="header_search_input"
                                            placeholder="Search for products..."
                                        />
                                        <div className="custom_dropdown">
                                            <div className="custom_dropdown_list">
                                                <span className="custom_dropdown_placeholder clc">
                                                    All Categories
                                                </span>
                                                <i className="fas fa-chevron-down"></i>
                                                <ul className="custom_list clc">
                                                    {categories.map((c, i) => (
                                                        <li>
                                                            <Link
                                                                className="clc"
                                                                to="#"
                                                                key={i}
                                                                value={c._id}
                                                            >
                                                                {c.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    <li>
                                                        <Link className="clc" to="#">
                                                            All Categories
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="clc" to="#">
                                                            Computers
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="clc" to="#">
                                                            Laptops
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="clc" to="#">
                                                            Cameras
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="clc" to="#">
                                                            Hardware
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="clc" to="#">
                                                            Smartphones
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="header_search_button trans_300"
                                            value="Submit"
                                        >
                                            <img src={search_img} alt="" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Cart and Wishlist  */}
                    <div className="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right">
                        <div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                            {/*  Cart  */}
                            <div className="cart">
                                <div className="cart_container d-flex flex-row align-items-center justify-content-end">
                                    <div className="cart_icon">
                                        <img src={cart_img} alt="" />
                                        <div className="cart_count">
                                            <span>{itemTotal()}</span>
                                        </div>
                                    </div>
                                    <div className="cart_content">
                                        <div className="cart_text">
                                            <Link to="/cart">Cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const header_navigation = () => (
        <nav className="main_nav">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="main_nav_content d-flex flex-row">
                            {/*  Categories Menu  */}

                            <div className="cat_menu_container">
                                <div className="cat_menu_title d-flex flex-row align-items-center justify-content-start">
                                    <div className="cat_burger">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="cat_menu_text">categories</div>
                                </div>

                                <ul className="cat_menu">
                                    <li>
                                        <Link to="#">
                                            Computers & Laptops{" "}
                                            <i className="fas fa-chevron-right ml-auto"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            Cameras & Photos<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                    <li className="hassubs">
                                        <Link to="#">
                                            Hardware<i className="fas fa-chevron-right"></i>
                                        </Link>
                                        <ul>
                                            <li className="hassubs">
                                                <Link to="#">
                                                    Menu Item
                                                    <i className="fas fa-chevron-right"></i>
                                                </Link>
                                                <ul>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item
                                                    <i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item
                                                    <i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item
                                                    <i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            Smartphones & Tablets
                                            <i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            TV & Audio<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            Gadgets<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            Car Electronics<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            Video Games & Consoles
                                            <i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            Accessories<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/*  Main Nav Menu  */}

                            <div className="main_nav_menu ml-auto">
                                <ul className="standard_dropdown main_nav_dropdown">
                                    <li>
                                        <Link to="index.html">
                                            Home<i className="fas fa-chevron-down"></i>
                                        </Link>
                                    </li>
                                    <li className="hassubs">
                                        <Link to="#">
                                            Super Deals<i className="fas fa-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                                <ul>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-down"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-down"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-down"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="hassubs">
                                        <Link to="#">
                                            Featured Brands<i className="fas fa-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                                <ul>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-down"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-down"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            Menu Item
                                                            <i className="fas fa-chevron-down"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    Menu Item<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="hassubs">
                                        <Link to="#">
                                            Pages<i className="fas fa-chevron-down"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link to="shop.html">
                                                    Shop<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="product.html">
                                                    Product<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="blog.html">
                                                    Blog<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="blog_single.html">
                                                    Blog Post<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="regular.html">
                                                    Regular Post
                                                    <i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="cart.html">
                                                    Cart<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="contact.html">
                                                    Contact<i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="blog.html">
                                            Blog<i className="fas fa-chevron-down"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="contact.html">
                                            Contact<i className="fas fa-chevron-down"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/*  Menu Trigger  */}

                            <div className="menu_trigger_container ml-auto">
                                <div className="menu_trigger d-flex flex-row align-items-center justify-content-end">
                                    <div className="menu_burger">
                                        <div className="menu_trigger_text">menu</div>
                                        <div className="cat_burger menu_burger_inner">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

    const header_menu = () => (
        <div className="page_menu">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="page_menu_content">
                            <div className="page_menu_search">
                                <form action="#">
                                    <input
                                        type="search"
                                        required="required"
                                        className="page_menu_search_input"
                                        placeholder="Search for products..."
                                    />
                                </form>
                            </div>
                            <ul className="page_menu_nav">
                                <li className="page_menu_item has-children">
                                    <Link to="#">
                                        Language<i className="fa fa-angle-down"></i>
                                    </Link>
                                    <ul className="page_menu_selection">
                                        <li>
                                            <Link to="#">
                                                English<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Italian<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Spanish<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Japanese<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="page_menu_item has-children">
                                    <Link to="#">
                                        Currency<i className="fa fa-angle-down"></i>
                                    </Link>
                                    <ul className="page_menu_selection">
                                        <li>
                                            <Link to="#">
                                                US Dollar<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                EUR Euro<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                GBP British Pound
                                                <i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                JPY Japanese Yen<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="page_menu_item">
                                    <Link to="#">
                                        Home<i className="fa fa-angle-down"></i>
                                    </Link>
                                </li>
                                <li className="page_menu_item has-children">
                                    <Link to="#">
                                        Super Deals<i className="fa fa-angle-down"></i>
                                    </Link>
                                    <ul className="page_menu_selection">
                                        <li>
                                            <Link to="#">
                                                Super Deals<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li className="page_menu_item has-children">
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                            <ul className="page_menu_selection">
                                                <li>
                                                    <Link to="#">
                                                        Menu Item
                                                        <i className="fa fa-angle-down"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        Menu Item
                                                        <i className="fa fa-angle-down"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        Menu Item
                                                        <i className="fa fa-angle-down"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        Menu Item
                                                        <i className="fa fa-angle-down"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="page_menu_item has-children">
                                    <Link to="#">
                                        Featured Brands<i className="fa fa-angle-down"></i>
                                    </Link>
                                    <ul className="page_menu_selection">
                                        <li>
                                            <Link to="#">
                                                Featured Brands<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="page_menu_item has-children">
                                    <Link to="#">
                                        Trending Styles<i className="fa fa-angle-down"></i>
                                    </Link>
                                    <ul className="page_menu_selection">
                                        <li>
                                            <Link to="#">
                                                Trending Styles<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Menu Item<i className="fa fa-angle-down"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="page_menu_item">
                                    <Link to="blog.html">
                                        blog<i className="fa fa-angle-down"></i>
                                    </Link>
                                </li>
                                <li className="page_menu_item">
                                    <Link to="contact.html">
                                        contact<i className="fa fa-angle-down"></i>
                                    </Link>
                                </li>
                            </ul>

                            <div className="menu_contact">
                                <div className="menu_contact_item">
                                    <div className="menu_contact_icon">
                                        <img src="images/phone_white.png" alt="" />
                                    </div>
                                    +38 068 005 3570
                                </div>
                                <div className="menu_contact_item">
                                    <div className="menu_contact_icon">
                                        <img src="images/mail_white.png" alt="" />
                                    </div>
                                    <Link to="mailto:fastsales@gmail.com">fastsales@gmail.com</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="header">
            {header_top_bar()}
            {header_main()}
            {header_navigation()}
            {header_menu()}
        </div>
    );
};

export default withRouter(Header);
