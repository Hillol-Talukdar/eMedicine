import React from "react";
import { Link } from "react-router-dom";

const UserPageNavbar = () => (
    <nav>
        <ul className="nav flex-column align-items-center mt-5 btn">
            <li className="nav-item mb-2 mt-2">
                <Link to="/user/wishlist" className="nav-link">
                    Your Wishlist
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/user/history" className="nav-link mb-2">
                    Order History
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

export default UserPageNavbar;
