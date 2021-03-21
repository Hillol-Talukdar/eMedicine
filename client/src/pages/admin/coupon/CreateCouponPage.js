import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datePicker";
import {
    getCoupons,
    removeCoupon,
    createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";

const CreateCouponPage = () => {
    return (
        <div>
            <h4>Coupon Page</h4>
        </div>
    );
};

export default CreateCouponPage;
