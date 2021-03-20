import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, emptyCart, saveAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("Enter Shipping Address Here");
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
            <div className="col-md-8">
                <h4 className="text-light text-center pt-3 pb-3 mb-0 jumbotron bg-secondary">
                    Shipping Address
                </h4>
                <br />
                <br />
                <ReactQuill
                    theme="snow"
                    value={address}
                    onChange={setAddress}
                    className="mx-2"
                    onFocus={() => setAddress("")}
                />
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button
                        className="btn btn-outline-primary mt-3"
                        onClick={saveAddressToDb}
                    >
                        Confirm Address
                    </button>
                </div>
                <hr />
                <h4 className="text-light text-center pt-3 pb-3 mb-0 mt-3 jumbotron bg-secondary">
                    Have Coupon?
                </h4>
                <br />
                {/* Coupon input and apply Button */}
            </div>

            <div className="col-md-4">
                <h4 className="pt-3 jumbotron">Order Summary</h4>
                <hr />
                <p>
                    <strong>Products ({products.length})</strong>
                </p>
                {products.map((p, i) => (
                    <div key={i}>
                        <p>
                            {p.product.title} x {p.count} = ৳{" "}
                            {p.product.price * p.count}
                        </p>
                    </div>
                ))}
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex flex-row mt-2">
                            <b>Total Amount:&nbsp;</b>
                            <b className="h6">৳&nbsp;</b>
                            {total}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <button
                            className="btn btn-outline-primary w-75"
                            disabled={!saveAddressToDb || !products.length}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
                <hr />
                <div className="mx-auto row">
                    <button
                        disabled={!products.length}
                        onClick={clearCart}
                        className="btn btn-outline-danger w-75 m-auto"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Checkout;
