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
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div class="row">
                <div class="col-md-2">
                    <AdminPageNav />
                </div>
                <div class="col mt-4">
                    <h1 className="text-primary text-center">eMedicine</h1>
                    <div className="mt-3">
                        {loading ? (
                            <h4 className="d-flex justify-content-center text-primary">
                                Creating Coupon...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center">
                                Create New Coupon
                            </h4>
                        )}
                        <form
                            className="d-flex align-items-center flex-column"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                className="form-control w-50 mx-auto text-center"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Coupon Name"
                                autoFocus
                                required
                            />
                            <input
                                type="text"
                                className="form-control w-50 mx-auto mt-3 text-center"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                placeholder="Discount %"
                                required
                            />
                            <div className="row w-100">
                                <DatePicker
                                    className="form-control mx-auto w-50 mt-3 text-center"
                                    onChange={(date) => setExpiry(date)}
                                    selected={new Date()}
                                    value={expiry}
                                    placeholderText="Choose Expiry Date"
                                />

                                <button
                                    class="btn btn-primary form-control w-25 mx-auto mt-3"
                                    type="submit"
                                    disabled={loading || name.length < 5}
                                >
                                    Create Coupon&nbsp;&nbsp;
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-plus-square-fill mb-1"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;
