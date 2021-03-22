import React from "react";

const ShowPaymentInfo = ({ order }) => (
    <div>
        <p>
            <b>
                <span className="badge bg-secondary mx-1">
                    Order Id: {order.paymentIntent.id}
                </span>
                <span className="badge bg-primary text-white">
                    Status: {order.orderStatus}
                </span>
                <span className="badge bg-success mx-1">
                    Amount:{" "}
                    {(order.paymentIntent.amount /= 100).toLocaleString(
                        "en-US",
                        {
                            style: "currency",
                            currency: "BDT",
                        }
                    )}
                </span>

                <span className="badge bg-warning text-dark mx-1">
                    Method:{" "}
                    {order.paymentIntent.payment_method_types[0].toUpperCase()}
                </span>

                <span className="badge bg-info text-dark mx-1">
                    Payment: {order.paymentIntent.status.toUpperCase()}
                </span>

                <span className="badge bg-secondary mx-1">
                    Ordered on:{" "}
                    {new Date(
                        order.paymentIntent.created * 1000
                    ).toLocaleString()}
                </span>
            </b>
        </p>
    </div>
);

export default ShowPaymentInfo;
