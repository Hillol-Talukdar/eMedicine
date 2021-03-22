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

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <UserPageNavbar />
                </div>
                <div class="col">This Is User History Page</div>
            </div>
        </div>
    );
};

export default History;
