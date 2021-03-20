import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartCard from "../components/cards/ProductCartCard";

const Cart = () => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotalAmount = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saveOrderNow = () => {
        //
    };

    const showCartItems = () => (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            {cart.map((prod) => (
                <ProductCartCard key={prod._id} prod={prod} />
            ))}
        </table>
    );

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
                            <Link to="/shop">Continue Shopping!</Link>
                        </h6>
                    ) : (
                        showCartItems()
                    )}
                </div>
                <div className="col-md-4">
                    <h4 className="pt-3 pb-3 mb-3 jumbotron">Order Summary</h4>
                    <hr />
                    <p>Product</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>
                                {c.title} x {c.count} = {c.price * c.count}
                                &nbsp;৳
                            </p>
                        </div>
                    ))}
                    <hr />

                    <div className="d-flex flex-row">
                        Total:&nbsp;
                        <b className="h6">৳&nbsp;</b>
                        <b>{getTotalAmount()}</b>
                    </div>
                    <hr />
                    {user ? (
                        <button
                            onClick={saveOrderNow}
                            disabled={!cart.length}
                            className="btn btn-primary btn-sm"
                        >
                            Proceed to Checkout
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-sm">
                            <Link
                                to={{
                                    pathname: "/login",
                                    state: { from: "cart" },
                                }}
                            >
                                Login to Checkout
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
