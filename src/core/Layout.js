import React, { Fragment } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../styles.css";
import Menu from "./Menu";
import Footer from "./Footer";
import Carousel from "./Carousel";

const Layout = ({ title = "Title", description = "Description", className, children }) => (
    <div>
        <Menu />
        <Carousel />
        <div className={className}>{children}</div>
        <Footer />
    </div>
);

export default Layout;
