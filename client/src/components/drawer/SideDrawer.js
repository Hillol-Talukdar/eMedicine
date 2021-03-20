import React, { Component, useState } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultCoverImage from "../../images/defaultCoverImage.png";

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: "100%",
        height: "100px",
        ObjectFit: "cover",
    };

    return (
        <Drawer
            className="text-center"
            title={`Cart (${cart.length} items)`}
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
            {cart.map((product) => (
                <div key={product._id} className="row mb-2 mx-auto">
                    <div className="row mx-auto">
                        {product.images[0] ? (
                            <>
                                <img
                                    src={product.images[0].url}
                                    style={imageStyle}
                                />
                                <p className="text-center bg-secondary text-light h6 small pb-2 pt-1">
                                    {product.title} * {product.count}
                                </p>
                            </>
                        ) : (
                            <>
                                <img
                                    src={defaultCoverImage}
                                    style={imageStyle}
                                />
                                <p className="text-center bg-secondary text-light h6 small pb-2 pt-1">
                                    {product.title} * {product.count}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <Link to="/cart" className="d-grid gap-2 col-8 mx-auto">
                <button
                    onClick={() =>
                        dispatch({
                            type: "SET_VISIBLE",
                            payload: false,
                        })
                    }
                    className="text-center btn btn-outline-primary btn-sm"
                >
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    );
};

export default SideDrawer;
