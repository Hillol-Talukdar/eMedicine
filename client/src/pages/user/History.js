import React, { useState, useEffect } from "react";
import UserPageNavbar from "../../components/navbar/UserPageNavbar";
import { getUserOrders } from "../../functions/user";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders();
    }, []);

    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const showOrderInTable = (order) => <p>each order and it's product</p>;

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <p>Show payment info</p>

                {showOrderInTable(order)}

                <div className="row">
                    <div className="col">
                        <p>PDF Download</p>
                    </div>
                </div>
            </div>
        ));

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <UserPageNavbar />
                </div>
                <div class="col text-center">
                    <h4>
                        {orders.length > 0
                            ? "User purchase orders"
                            : "No purchase orders"}
                    </h4>

                    {showEachOrders()}
                </div>
            </div>
        </div>
    );
};

export default History;
