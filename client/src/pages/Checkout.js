import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, emptyUserCart } from "../functions/user";
import { toast } from "react-toastify";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

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
        //
    };

    const emptyCart = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        emptyUserCart(user.token).then((res) => {
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
                textArea
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
                        <button className="btn btn-primary">Place Order</button>
                    </div>

                    <div className="col-md-6">
                        <button
                            disabled={!products.length}
                            onClick={emptyCart}
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
