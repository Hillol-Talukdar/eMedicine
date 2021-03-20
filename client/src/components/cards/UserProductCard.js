import { Card, Tooltip } from "antd";
import React, { useState } from "react";
import defaultCoverImage from "../../images/defaultCoverImage.png";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const UserProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState("click to add");

    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        //create cart Array
        let cart = [];
        if (typeof window !== "undefined") {
            //if cart is in Local-Storage
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            //push new item to cart
            cart.push({
                ...product,
                count: 1,
            });

            //remove duplicate
            let unique = _.uniqWith(cart, _.isEqual);

            //save to local storage
            localStorage.setItem("cart", JSON.stringify(unique));

            //show Tooltip
            setTooltip("Added");

            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });

            //show cart item in Side-Drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    const { title, description, images, slug, price } = product;
    return (
        <>
            <Card
                style={{
                    border: "1px solid #e7e6e1",
                    borderRadius: "3px",
                }}
                cover={
                    <img
                        src={
                            images && images.length
                                ? images[0].url
                                : defaultCoverImage
                        }
                        style={{
                            height: "170px",
                            // width: "286px",
                            objectFit: "cover",
                        }}
                        className="pt-2 px-2"
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined
                            style={{ fontSize: "15px" }}
                            className="text-primary"
                        />
                        <br />
                        <p className="h6 small">View in Detail</p>
                    </Link>,

                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart}>
                            <ShoppingCartOutlined
                                style={{ fontSize: "18px" }}
                                className="text-danger"
                            />
                            <br />
                            <p className="h6 small">Add to Cart</p>
                        </a>
                    </Tooltip>,
                ]}
            >
                <Meta
                    title={`${title} - ৳${price}`}
                    description={`${
                        description && description.substring(0, 25)
                    }...`}
                />
                <div className="mt-3">
                    {product &&
                    product.ratings &&
                    product.ratings.length > 0 ? (
                        showAverage(product)
                    ) : (
                        <p className="text-muted mb-3">No Rating Yet</p>
                    )}
                </div>
            </Card>
        </>
    );
};

export default UserProductCard;
