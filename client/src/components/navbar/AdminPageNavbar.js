import React from "react";
import { Link } from "react-router-dom";

const AdminPageNavbar = () => (
    <nav className="mt-5 btn">
        <ul className="nav flex-column align-items-center">
            <li className="nav-item mb-2">
                <Link to="/admin/dashboard" className="nav-link">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/admin/product" className="nav-link">
                    Add Product
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/admin/products" className="nav-link">
                    All Products
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/admin/category" className="nav-link">
                    Category
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/admin/sub-category" className="nav-link">
                    Sub Category
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/admin/coupon" className="nav-link">
                    Add Coupons
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/user/password" className="nav-link">
                    Change Password
                </Link>
            </li>
        </ul>
    </nav>
);

export default AdminPageNavbar;
