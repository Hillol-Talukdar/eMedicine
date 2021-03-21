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
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () =>
        getCoupons().then((res) => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                loadAllCoupons();
                setName("");
                setDiscount("");
                setExpiry("");
                toast.success(`Coupon ${res.data.name} is created!`);
            })
            .catch((err) => console.log("Creating Coupon Error", err));
    };

    const handleRemove = (couponId) => {
        if (window.confirm("Delete?")) {
            setLoading(true);

            removeCoupon(couponId, user.token)
                .then((res) => {
                    loadAllCoupons();
                    setLoading(false);

                    toast.error(` Coupon "${res.data.name}" deleted`);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="w-100">
            <div className="row w-100">
                <div className="col-md-2">
                    <AdminPageNav />
                </div>
                <div className="col-md-10 mt-4">
                    <h1 className="text-primary text-center">eMedicine</h1>
                    <div className="mt-3">
                        {loading ? (
                            <h4 className="d-flex justify-content-center text-primary">
                                Creating Coupon...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center  text-muted">
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
                                <div
                                    class="d-grid col-8 w-45 mx-auto mt-3"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Name which contains atleast 5 character will enable this button"
                                >
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
                            </div>
                        </form>

                        <br />
                        <h4 className="text-center  text-muted">
                            {coupons.length} Coupons Are Available Now For
                            Applying
                        </h4>

                        <table className="table table-bordered table-striped mx-auto">
                            <thead className="table-secondary text-center">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Expiry</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {coupons.map((c) => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>
                                            {new Date(
                                                c.expiry
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{c.discount}%</td>
                                        <td>
                                            <span
                                                className="btn btn-sm"
                                                onClick={() =>
                                                    handleRemove(c._id)
                                                }
                                                style={{ float: "center" }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-trash text-danger"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                    />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;
