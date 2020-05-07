import React from "react";
import Menu from "./Menu";
import Menu2 from "./Menu2";
import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const Layout = ({ title = "Title", description = "Description", className, children }) => (
    <div>
        <Menu2 />
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
