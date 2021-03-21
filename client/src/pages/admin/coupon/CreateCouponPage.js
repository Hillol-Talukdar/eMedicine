import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import {
    getCoupons,
    removeCoupon,
    createCoupon,
} from "../../../functions/coupon";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreateCouponPage = () => {
    return (
        <div>
            <div class="row">
                <div class="col-md-2">
                    <AdminPageNav />
                </div>
                <div class="col mt-5">
                    <h4>Coupon Page</h4>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;
