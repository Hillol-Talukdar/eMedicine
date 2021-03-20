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
            title={`Cart (${cart.length} Product(s))`}
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
                <div key={product._id} className="row">
                    <div className="row">
                        {product.images[0] ? (
                            <>
                                <img
                                    src={product.images[0].url}
                                    style={imageStyle}
                                />
                                <p className="text-center bg-secondary text-light">
                                    {product.title} * {product.count}
                                </p>
                            </>
                        ) : (
                            <>
                                <img
                                    src={defaultCoverImage}
                                    style={imageStyle}
                                />
                                <p className="text-center bg-secondary text-light">
                                    {product.title} * {product.count}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <Link to="/cart">
                <button
                    onClick={() =>
                        dispatch({
                            type: "SET_VISIBLE",
                            payload: false,
                        })
                    }
                    className="text-center btn btn-success btn-raised btn-block"
                >
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    );
};

export default SideDrawer;
