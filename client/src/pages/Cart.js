import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartCard from "../components/cards/ProductCartCard";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotalAmount = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saveOrderNow = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        userCart(cart, user.token)
            .then((res) => {
                // console.log("cart POST RES", res);
                if (res.data.ok) {
                    history.push("/checkout");
                }
            })
            .catch((err) => console.log("cart save err", err));
    };

    const showCartItems = () => (
        <table className="table table-bordered table-striped mx-auto">
            <thead className="table-secondary">
                <tr className="">
                    <th className="text-center" scope="col">
                        Product Image
                    </th>
                    <th className="text-center" scope="col">
                        Name
                    </th>
                    <th className="text-center" scope="col">
                        Price
                    </th>
                    <th className="text-center" scope="col">
                        Brand
                    </th>
                    <th className="text-center" scope="col">
                        Quantity
                    </th>
                    <th className="text-center" scope="col">
                        Shipping
                    </th>
                    <th className="text-center" scope="col">
                        Remove
                    </th>
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
                <div className="col-md-9 text-center">
                    <h4 className="text-light text-center pt-4 pb-3 mb-0 jumbotron bg-secondary d-flex flex-row">
                        &nbsp;Cart
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
                <div className="col-md-3">
                    <h4 className="pt-4 pb-2 mb-3 jumbotron">Order Summary</h4>
                    <hr />
                    <p>Product</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>
                                {c.title} x {c.count} = &nbsp;৳{" "}
                                {c.price * c.count}
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
