import React from "react";
import AdminPageNav from "../../components/navbar/AdminPageNavbar";

const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminPageNav />
                </div>
                <div className="col mt-4 mx-5">
                    <div className="">
                        <div className="d-flex justify-content-between border-bottom mb-3 border-2">
                            <h4 className="ml-auto">All Products</h4>

                            <h4 className="text-primary mr-auto">eMedicine</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
