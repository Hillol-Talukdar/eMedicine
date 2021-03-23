import React, { useState, useEffect } from "react";
import UserPageNavbar from "../../components/navbar/UserPageNavbar";
import { getUserOrders } from "../../functions/user";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders();
    }, []);

    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
            // console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const showOrderInTable = (order) => (
        <table className="table table-bordered table-striped mx-auto">
            <thead className="table-secondary text-center">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Count</th>
                    <th scope="col">Price</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td>
                            <b>{p.product.title}</b>
                        </td>
                        <td>{p.product.brand}</td>
                        <td>{p.count}</td>
                        <td>{p.product.price}</td>
                        <td>
                            {p.product.shipping === "Yes" ? (
                                <CheckCircleOutlined
                                    style={{ color: "green" }}
                                />
                            ) : (
                                <CloseCircleOutlined style={{ color: "red" }} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-outline-primary"
        >
            Download Invoice PDF
        </PDFDownloadLink>
    );

    const showEachOrders = () =>
        orders.reverse().map((order, i) => (
            <div key={i} className="m-4 p-3 card">
                <ShowPaymentInfo order={order} />

                {showOrderInTable(order)}

                <div className="row">
                    <div className="col">{showDownloadLink(order)}</div>
                </div>
            </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 border">
                    <UserPageNavbar />
                </div>
                <div className="col text-center mt-4">
                    <h4>
                        {orders.length > 0
                            ? "Your Order History"
                            : "No Purchase Orders"}
                    </h4>

                    {showEachOrders()}
                </div>
            </div>
        </div>
    );
};

export default History;
