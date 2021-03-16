import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultCoverImage from "../../images/defaultCoverImage.png";
import ProductListItems from "./ProductListItems";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
    const { title, images, description } = product;

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
                            <ShoppingCartOutlined
                                style={{ fontSize: "25px" }}
                                className="text-danger"
                            />
                            <br />
                            <p className="h6 small mt-1">Add to Cart</p>
                        </>,
                        <Link to="/">
                            <HeartOutlined
                                style={{ fontSize: "21px" }}
                                className="text-success"
                            />
                            <br />
                            <p className="h6 small mt-1">Add to WishList</p>
                        </Link>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
