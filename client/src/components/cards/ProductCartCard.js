import React from "react";
import ImageModal from "react-modal-image";
import defaultCoverImage from "../../images/defaultCoverImage.png";

const ProductCartCard = ({ prod }) => {
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "120px", height: "auto" }}>
                        {prod.images.length ? (
                            <ImageModal
                                small={prod.images[0].url}
                                large={prod.images[0].url}
                            />
                        ) : (
                            <ImageModal
                                small={defaultCoverImage}
                                large={defaultCoverImage}
                            />
                        )}
                    </div>
                </td>
                <td>{prod.title}</td>
                <td>{prod.price}</td>
                <td>{prod.brand}</td>
                <td>{prod.count}</td>
                <td>Shipping</td>
                <td>Delete</td>
            </tr>
        </tbody>
    );
};

export default ProductCartCard;
