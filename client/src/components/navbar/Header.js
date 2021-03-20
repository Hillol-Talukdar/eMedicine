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
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">eMedicine</Link>
            </Menu.Item>
            <Menu.Item key="shop" icon={<ShopOutlined />}>
                <Link to="/shop">Shop</Link>
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
                    icon={<UserOutlined />}
                    style={{ float: "right" }}
                    title={user.email && user.email.split("@")[0]}
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
                icon={<ShoppingCartOutlined />}
            >
                <Link to="/cart">
                    Cart&nbsp;
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
