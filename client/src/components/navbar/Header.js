import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
    LoginOutlined,
    HomeOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    const handleClick = (e) => {
        setCurrent(e.key);
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
            </SubMenu>
        </Menu>
    );
};

export default Header;
