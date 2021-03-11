import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createAProduct } from "../../../functions/product";
import CreateProductForm from "../../../components/forms/CreateProductForm";

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
        "Antipyretic",
        "Tranquilizer",
        "Mood stabilizer",
        "Antiseptic",
        "Analgesic",
        "Antibiotic",
    ],
    brand: "",
};

const CreateProduct = () => {
    const [values, setValues] = useState(initState);

    //redux
    const { user } = useSelector((state) => ({ ...state }));

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

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <AdminPageNav />
                </div>
                <div class="col mt-5">
                    <h1 className="text-primary text-center">eMedicine</h1>
                    <div className="mt-3">
                        <h4 className="d-flex justify-content-center">
                            Create New Product
                        </h4>

                        <CreateProductForm
                            submitHandler={submitHandler}
                            changeHandler={changeHandler}
                            values={values}
                            btnName="Create Now"
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
