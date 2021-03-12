import React from "react";
import { Card } from "antd";
import defaultCoverImage from "../../images/defaultCoverImage.png";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    //destructure
    const { title, description, images } = product;
    return (
        <Card
            cover={
                <img
                    src={
                        images && images.length
                            ? images[0].url
                            : defaultCoverImage
                    }
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-2"
                />
            }
        >
            <Meta title={title} description={description} />
        </Card>
    );
};

export default AdminProductCard;
