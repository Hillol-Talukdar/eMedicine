import { Card } from "antd";
import React from "react";
import defaultCoverImage from "../../images/defaultCoverImage.png";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const UserProductCard = ({ product }) => {
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
                    <>
                        <ShoppingCartOutlined
                            style={{ fontSize: "18px" }}
                            className="text-danger"
                        />
                        <br />
                        <p className="h6 small">Add to Cart</p>
                    </>,
                ]}
            >
                <Meta
                    title={`${title} - ৳${price}`}
                    description={
                        `${description && description.substring(0, 25)}...`
                    }
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
