import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
            2020 - <Link to="/">PTH.com</Link>
        </div>
    </footer>
);

export default Footer;
