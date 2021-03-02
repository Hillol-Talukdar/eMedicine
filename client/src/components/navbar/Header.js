import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
    LoginOutlined,
    HomeOutlined,
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
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
    };

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            theme="dark"
            mode="horizontal"
        >
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
                key="register"
                icon={<UserAddOutlined />}
                style={{ float: "right" }}
            >
                <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item
                key="login"
                icon={<LoginOutlined />}
                style={{ float: "right" }}
            >
                <Link to="/login">Login</Link>
            </Menu.Item>
            <SubMenu key="SubMenu" icon={<UserOutlined />} title="UserName">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
                    Logout
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default Header;
