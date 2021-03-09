import React from "react";
import AdminPageNav from "../../components/navbar/AdminPageNavbar";

const AdminDashboard = () => {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <AdminPageNav />
                </div>
                <div class="col">This Is Admin Dasboard</div>
            </div>
        </div>
    );
};

export default AdminDashboard;
