import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import {
    DownSquareOutlined,
    CheckOutlined,
    SwapOutlined,
} from "@ant-design/icons";
import defaultCoverImage from "../images/defaultCoverImage.png";
import { createOrder, emptyCart } from "../functions/user";

const StripeCheckout = ({ history }) => {
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(user.token, coupon).then((res) => {
            setClientSecret(res.data.clientSecret);
            //response received on successful payment
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayable(res.data.payable);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            createOrder(payload, user.token).then((res) => {
                if (res.data.ok) {
                    // empty cart from local storage
                    if (typeof window !== "undefined")
                        localStorage.removeItem("cart");
                    // empty cart from redux
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: [],
                    });
                    // reset coupon to false
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: false,
                    });
                    // empty cart from database
                    emptyCart(user.token);
                }
            });
            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            {!succeeded && (
                <div>
                    {coupon && totalAfterDiscount !== undefined ? (
                        <p className="h6 alert alert-success mb-1">{`Total Amount After Discount: ৳ ${totalAfterDiscount}`}</p>
                    ) : (
                        <p className="alert alert-danger mb-1">
                            No coupon is applied
                        </p>
                    )}
                </div>
            )}
            <div className="text-center mb-1">
                <Card
                    cover={
                        <img
                            src={defaultCoverImage}
                            style={{
                                height: "200px",
                                objectFit: "cover",
                                marginBottom: "-50px",
                            }}
                        />
                    }
                    actions={[
                        <>
                            <div className="mx-auto">
                                <DownSquareOutlined
                                    className="text-muted mt-2 mb-1"
                                    style={{ fontSize: "19px" }}
                                />{" "}
                                <br />{" "}
                                <p className="h6">Total: ৳ {cartTotal}</p>
                            </div>
                        </>,
                        <div>
                            <CheckOutlined
                                className="text-primary mt-2 mb-1"
                                style={{
                                    fontSize: "18px",
                                }}
                            />{" "}
                            <br />{" "}
                            <p className="h6 text-primary">
                                Total payable : ৳ {(payable / 100).toFixed(2)}
                            </p>
                        </div>,
                    ]}
                />
            </div>
            <form
                id="payment-form"
                className="stripe-form"
                onSubmit={handleSubmit}
            >
                <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Proceed to Pay"
                        )}
                    </span>
                </button>
                <br />
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                <br />
                <p
                    className={
                        succeeded ? "result-message" : "result-message hidden"
                    }
                >
                    Payment Successful!{" "}
                    <Link to="/user/history">Check in purchase history.</Link>
                </p>
            </form>
        </>
    );
};

export default StripeCheckout;
