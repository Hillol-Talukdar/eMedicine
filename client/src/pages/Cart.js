import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    return (
        <div>
            <div className="row w-100">
                <div className="col-md-8">
                    <h4 className="text-light text-center pt-3 pb-3 mb-3 jumbotron bg-secondary d-flex flex-row">
                        Cart
                        <h6 className="text-light mt-2">
                            &nbsp;({cart.length} items)
                        </h6>
                    </h4>
                    {!cart.length ? (
                        <h6>
                            No Product Found In Your Cart.{" "}
                            <Link>Continue Shopping!</Link>
                        </h6>
                    ) : (
                        "Show Cart Items"
                    )}
                </div>
                <div className="col-md-4">
                    <h4 className="pt-3 pb-3 mb-3 jumbotron">Order Summary</h4>
                    <hr />
                    <p>Product</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>Title x quantity = total amount</p>
                        </div>
                    ))}
                    <hr />
                    {user ? (
                        <button className="btn btn-primary btn-sm">
                            Proceed to Checkout
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-sm">
                            Login to Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
