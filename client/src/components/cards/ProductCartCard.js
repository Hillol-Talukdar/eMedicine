import React from "react";

const ProductCartCard = ({ prod }) => {
    return (
        <tbody>
            <tr>
                <td>Image</td>
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
