import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, emptyCart, saveAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaveStatus, setAddressSaveStatus] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            // console.log("User cart res", JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });
    }, []);

    const saveAddressToDb = () => {
        saveAddress(user.token, address).then((res) => {
            if (res.data.ok) {
                setAddressSaveStatus(true);
                toast.success(`Shopping Address Saved Successfully!"`);
            }
        });
    };

    const clearCart = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        emptyCart(user.token).then((res) => {
            setProducts([]);
            setTotal(0);
            toast.success(`Cart is cleared. Continue Shopping!"`);
        });
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery adress</h4>
                <br />
                <br />
                <ReactQuill
                    theme="snow"
                    value={address}
                    onChange={setAddress}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={saveAddressToDb}
                >
                    Save
                </button>
                <hr />
                <h4>Got Coupon?</h4>
                <br />
                Coupon input and apply Button
            </div>

            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {products.map((p, i) => (
                    <div key={i}>
                        <p>
                            {p.product.title} x {p.count} = ৳{" "}
                            {p.product.price * p.count}
                        </p>
                    </div>
                ))}
                <hr />
                <p>Cart Total: ৳ {total}</p>

                <div className="row">
                    <div className="col-md-6">
                        <button
                            className="btn btn-primary"
                            disabled={!saveAddressToDb || !products.length}
                        >
                            Place Order
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button
                            disabled={!products.length}
                            onClick={clearCart}
                            className="btn btn-primary"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Checkout;
