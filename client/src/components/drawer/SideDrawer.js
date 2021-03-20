import React, { Component, useState } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultCoverImage from "../../images/defaultCoverImage.png";

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    return (
        <Drawer
            className="text-center"
            title={`Cart - ${cart.length} Product(s)`}
            placement="right"
            closable={false}
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                });
            }}
            visible={drawer}
        >
            {JSON.stringify(cart)}
        </Drawer>
    );
};

export default SideDrawer;
