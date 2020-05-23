import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,
} from "mdbreact";

const isActiveTab = (history, path) => {
    if (history.location.pathname === path) {
        return true;
    } else {
        return false;
    }
};

const Menu = ({ history }) => {
    const [isOpen, setisOpen] = useState(false);

    const toggleCollapse = () => {
        setisOpen(!isOpen);
    };

    return (
        <MDBNavbar color="blue-gradient" dark expand="md">
            <MDBNavbarBrand>
                <Link to="/">
                    <strong className="white-text">PTH</strong>
                </Link>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active={isActiveTab(history, "/")}>
                        <MDBNavLink to="/">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={isActiveTab(history, "/shop")}>
                        <MDBNavLink to="/shop">Shop</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink
                            className="waves-effect waves-light"
                            to="/cart"
                            style={{ marginRight: "7px" }}
                        >
                            <MDBIcon fas icon="shopping-cart" className="fa-lg" />
                            <sub className="badge badge-primary">{itemTotal()}</sub>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <MDBIcon icon="user" className="fa-lg" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu right className="dropdown-default">
                                {isAuthenticated() &&
                                    (isAuthenticated().user.role === 0 ||
                                        isAuthenticated().user.role === 1) && (
                                        <MDBDropdownItem href="/user/dashboard">
                                            User dashboard
                                        </MDBDropdownItem>
                                    )}

                                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                    <MDBDropdownItem href="/admin/dashboard">
                                        Admin dashboard
                                    </MDBDropdownItem>
                                )}

                                {!isAuthenticated() && (
                                    <Fragment>
                                        <MDBDropdownItem href="/signin">Sign in</MDBDropdownItem>
                                        <MDBDropdownItem href="/signup">Sign up</MDBDropdownItem>
                                    </Fragment>
                                )}

                                {isAuthenticated() && (
                                    <MDBDropdownItem href="/" onClick={signout}>
                                        Sign out
                                    </MDBDropdownItem>
                                )}
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
};

export default withRouter(Menu);
