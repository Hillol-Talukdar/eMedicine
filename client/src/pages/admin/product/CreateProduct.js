import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createAProduct } from "../../../functions/product";
import CreateProductForm from "../../../components/forms/CreateProductForm";
import {
    getAllCategories,
    getSelectedSubCategory,
} from "../../../functions/category";
import UploadFile from "../../../components/forms/UploadFile";

const initState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subCategory: [],
    shipping: "",
    quantity: "",
    images: [],
    brands: [
        "ACI Limited",
        "ACME Laboratories Ltd.",
        "Al-Madina Pharmaceuticals Ltd.",
        "Beximco Pharmaceuticals Ltd.",
        "Bengal drugs Ltd.",
        "BioRx",
        "Globe Pharmaceuticals Ltd.",
        "Ibn Sina Pharmaceuticals Ltd.",
    ],
    brand: "",
};

const CreateProduct = () => {
    const [values, setValues] = useState(initState);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [showSubCategory, setShowSubCategory] = useState(false);
    //redux
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllCategories();
    }, []);

    const loadAllCategories = () =>
        getAllCategories().then((cat) =>
            setValues({ ...values, categories: cat.data })
        );

    const submitHandler = (e) => {
        e.preventDefault();
        createAProduct(values, user.token)
            .then((res) => {
                // console.log(res);
                window.alert(`"${res.data.title}" is created!`);
                window.location.reload();
            })
            .catch((err) => {
                // console.log(err);
                toast.error(err.response.data.err);
            });
    };

    const changeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const categorySelectHandler = (e) => {
        e.preventDefault();
        setValues({ ...values, subCategory: [], category: e.target.value });
        getSelectedSubCategory(e.target.value).then((res) => {
            // console.log("SubCategory Options OnClick", res);
            setSubCategoryOptions(res.data);
        });
        setShowSubCategory(true);
    };

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2 bg-dark">
                    <AdminPageNav />
                </div>
                <div class="col mt-4 mx-5">
                    <div className="">
                        <div className="d-flex justify-content-between border-bottom mb-3 border-2">
                            <h4 className="ml-auto">Create New Product</h4>
                            <h4 className="text-primary mr-auto">eMedicine</h4>
                        </div>
                        {/* {JSON.stringify(values.images)} */}
                        <div className="mb-3">
                            <UploadFile
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                            />
                        </div>
                        <CreateProductForm
                            submitHandler={submitHandler}
                            changeHandler={changeHandler}
                            values={values}
                            setValues={setValues}
                            categorySelectHandler={categorySelectHandler}
                            subCategoryOptions={subCategoryOptions}
                            showSubCategory={showSubCategory}
                            btnName="Create The Product"
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
