import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
    const { title, description, images, slug } = product;

    return (
        <>
            <div className="col-md-7">image carousal</div>

            <div className="col-md-5">
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-primary" />
                            <br />
                            <p className="h6 small">Add to Cart</p>
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" />
                            <br />
                            <p className="h6 small">Add to WishList</p>
                        </Link>,
                    ]}
                >
                    <Meta title={title} description={description} />
                    <p>
                        price/category/subs/shippig/color/brand/quantity
                        available/sold
                    </p>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
