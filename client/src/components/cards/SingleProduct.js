import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultCoverImage from "../../images/defaultCoverImage.png";
import ProductListItems from "./ProductListItems";
import Rating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onClickStart, star }) => {
    const { title, images, description, _id } = product;
    const [tooltip, setTooltip] = useState("click to add");

    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    let history = useHistory();

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

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
            // console.log("ADDED TO WISHLIST", res.data);
            toast.success("Added to your wishlist.");
            history.push("/user/wishlist");
        });
    };

    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images &&
                            images.map((image) => (
                                <img src={image.url} key={image.public_id} />
                            ))}
                    </Carousel>
                ) : (
                    <Card
                        cover={
                            <img
                                src={defaultCoverImage}
                                className="mb-3 card-image"
                            />
                        }
                    ></Card>
                )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>

                    <TabPane tab="More" key="2">
                        More
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h2 className="bg-secondary text-light p-3">{title}</h2>
                <Card
                    actions={[
                        <>
                            <Tooltip title={tooltip}>
                                <a onClick={handleAddToCart}>
                                    <ShoppingCartOutlined
                                        style={{ fontSize: "25px" }}
                                        className="text-danger mt-1"
                                    />
                                    <br />
                                    <p className="h6 small">Add to Cart</p>
                                </a>
                            </Tooltip>
                        </>,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined
                                style={{ fontSize: "21px" }}
                                className="text-info"
                            />
                            <br />
                            <p className="h6 small mt-1">Add to WishList</p>
                        </a>,
                        <RatingModal>
                            <Rating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                isSelectable={true}
                                starRatedColor="#ffd700"
                                starHoverColor="#ffd700"
                                changeRating={onClickStart}
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                            Rating
                            <span className="label label-default label-pill pull-xs-right pt-3">
                                {product &&
                                product.ratings &&
                                product.ratings.length > 0 ? (
                                    showAverage(product)
                                ) : (
                                    <p className="text-muted">No Rating Yet</p>
                                )}
                            </span>
                        </li>
                    </ul>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
