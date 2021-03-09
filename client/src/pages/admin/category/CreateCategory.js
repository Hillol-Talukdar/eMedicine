import React from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";

const CreateCategory = () => {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <AdminPageNav />
                </div>
                <div class="col">
                    This Is The Page For Creating Category By Admin
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
