import React, { useState, useEffect } from "react";
import AdminPageNav from "../../components/navbar/AdminPageNavbar";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () =>
        getOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success("Status Updated Successfully!");
            loadOrders();
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminPageNav />
                </div>
                <div className="col mt-4 mx-5">
                    <div className="">
                        <div className="d-flex justify-content-between border-bottom mb-3 border-2">
                            <h4 className="ml-auto">Admin Dashboard</h4>

                            <h4 className="text-primary mr-auto">eMedicine</h4>
                        </div>
                    </div>
                    <Orders
                        orders={orders}
                        handleStatusChange={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
