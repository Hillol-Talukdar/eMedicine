import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
    LoginOutlined,
    HomeOutlined,
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined,
    DashboardOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import SearchForm from "../forms/SearchForm";

const { SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));
    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            paylaod: null,
        });
        history.push("/login");
        toast.success("Logged out successfully! See you soon!");
    };

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            theme="dark"
            mode="horizontal"
        >
            <Menu.Item key="home">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-house mb-1"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                </svg>
                <Link to="/">&nbsp;&nbsp;eMedicine</Link>
            </Menu.Item>
            <Menu.Item key="shop">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-shop mb-1"
                    viewBox="0 0 16 16"
                >
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                </svg>
                <Link to="/shop">&nbsp;&nbsp;Shop</Link>
            </Menu.Item>
            {!user && (
                <Menu.Item
                    key="register"
                    icon={<UserAddOutlined />}
                    style={{ float: "right" }}
                >
                    <Link to="/register">Register</Link>
                </Menu.Item>
            )}

            {!user && (
                <Menu.Item
                    key="login"
                    icon={<LoginOutlined />}
                    style={{ float: "right" }}
                >
                    <Link to="/login">Login</Link>
                </Menu.Item>
            )}
            {user && (
                <SubMenu
                    key="SubMenu"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-person-circle mb-1"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                                fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                        </svg>
                    }
                    style={{ float: "right" }}
                    title={user.email && "  ".concat(user.email.split("@")[0])}
                >
                    {user && user.role === "subscriber" && (
                        <Menu.Item icon={<DashboardOutlined />}>
                            <Link to="/user/history">Dashboard</Link>
                        </Menu.Item>
                    )}

                    {user && user.role === "admin" && (
                        <Menu.Item icon={<DashboardOutlined />}>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Menu.Item>
                    )}
                    <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                    </Menu.Item>
                </SubMenu>
            )}

            <Menu.Item
                key="cart"
                style={{ float: "right", marginRight: "1px" }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cart3 mb-1"
                    viewBox="0 0 16 16"
                >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <Link to="/cart">
                    &nbsp;&nbsp;Cart&nbsp;
                    <span className="badge bg-danger">{cart.length}</span>
                </Link>
            </Menu.Item>

            <span className="w-25 center" style={{ float: "right" }}>
                <SearchForm />
            </span>
        </Menu>
    );
};

export default Header;
