import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    updateASubCategory,
    getASubCategory,
} from "../../../functions/sub-category";
import { getAllCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import Categoryform from "../../../components/forms/Categoryform";

const UpdateSubCategory = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [parent, setParent] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadAllCategories();
        loadAllSubCategory();
    }, []);

    const loadAllCategories = () =>
        getAllCategories().then((cat) => setCategories(cat.data));

    const loadAllSubCategory = () =>
        getASubCategory(match.params.slug).then((subCat) => {
            setName(subCat.data.name);
            setParent(subCat.data.parent);
        });

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        updateASubCategory(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`Subcategory is updated successfully!`);
                history.push("/admin/sub-category");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <AdminPageNav />
                </div>
                <div class="col mt-5">
                    <h1 className="text-primary text-center">eMedicine</h1>
                    <div className="mt-3">
                        {loading ? (
                            <h4 className="d-flex justify-content-center text-primary">
                                Updating Subcategory...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center">
                                update Subcategory
                            </h4>
                        )}
                        {/* Category DropDown Starts From Here */}
                        <select
                            name="category"
                            className="form-control m-auto w-50 mb-3"
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option disabled>Select Parent Category</option>
                            {categories.length > 0 &&
                                categories.map((cat) => (
                                    <option
                                        key={cat._id}
                                        value={cat._id}
                                        selected={cat._id === parent}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                        {/* Category DropDown Ends Here */}
                        <Categoryform
                            submitHandler={submitHandler}
                            name={name}
                            setName={setName}
                            loading={loading}
                            btnName="Update Now"
                            btnIcon={
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
                            }
                        />
                        <hr className="mt-5" />

                        {/* <hr className="mt-3" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateSubCategory;
