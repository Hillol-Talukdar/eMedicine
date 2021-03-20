import React from "react";
import ImageModal from "react-modal-image";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import defaultCoverImage from "../../images/defaultCoverImage.png";
import {
    CheckSquareOutlined,
    CloseSquareOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

const ProductCartCard = ({ prod }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value;

        if (count > prod.quantity) {
            toast.error(`Max available quantity: " ${prod.quantity}`);
            return;
        }

        let cart = [];
        if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id == prod._id) cart[i].count = count;
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };
    const handleRemove = () => {
        let cart = [];
        if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id == prod._id) cart.splice(i, 1);
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };
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
                <td className="text-center">{prod.title}</td>
                <td className="text-center">{prod.price}</td>
                <td className="text-center">{prod.brand}</td>
                <td className="text-center">
                    <input
                        type="number"
                        className="form-control btn-sm"
                        value={prod.count}
                        onChange={handleQuantityChange}
                    ></input>
                </td>
                <td className="text-center">
                    {prod.shipping === "Yes" ? (
                        <CheckSquareOutlined
                            style={{ fontSize: "21px" }}
                            className="text-success"
                        />
                    ) : (
                        <CloseSquareOutlined
                            style={{ fontSize: "21px" }}
                            className="text-danger"
                        />
                    )}
                </td>
                <td className="text-center">
                    <CloseCircleOutlined
                        style={{ fontSize: "21px" }}
                        className="btn text-danger"
                        onClick={handleRemove}
                    />
                </td>
            </tr>
        </tbody>
    );
};

export default ProductCartCard;
