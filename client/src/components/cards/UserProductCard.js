import { Card } from "antd";
import React from "react";
import defaultCoverImage from "../../images/defaultCoverImage.png";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const UserProductCard = ({ product }) => {
    const { title, description, images, slug } = product;
    return (
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
                        height: "200px",
                        // width: "286px",
                        objectFit: "cover",
                    }}
                    className="pt-2 px-2"
                />
            }
            actions={[
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-primary" />
                    <br />
                    <p className="h6 small">Add to Cart</p>
                </Link>,
                <>
                    <ShoppingCartOutlined className="text-danger" />
                    <br />
                    <p className="h6 small">Add to Cart</p>
                </>,
            ]}
        >
            <Meta
                title={title}
                description={`${
                    description && description.substring(0, 25)
                }...`}
            />
        </Card>
    );
};

export default UserProductCard;
