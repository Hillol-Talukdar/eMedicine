import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createAProduct } from "../../../functions/product";
import { Link } from "react-router-dom";


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
    // const [loading, setLoading] = useState(false);

    //redux
    const { user } = useSelector((state) => ({ ...state }));

    //destructure
    const {
        title,
        description,
        price,
        categories,
        category,
        subCategory,
        shipping,
        quantity,
        images,
        brands,
        brand,
    } = values;

    const submitHandler = async (e) => {
        e.preventDefault();
        createAProduct(values, user.token)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 400)
                    toast.error(error.response.data);
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

                        {/* {loading ? (
                            <h4 className="d-flex justify-content-center text-primary">
                                Creating Product...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center">
                                Create New Product
                            </h4>
                        )} */}
                        {/* {JSON.stringify(values)}; */}
                        <form
                            class="d-flex align-items-center flex-column"
                            onSubmit={submitHandler}
                        >
                            <input
                                type="text"
                                name="title"
                                class="form-control text-center w-50"
                                placeholder="Title"
                                value={title}
                                onChange={changeHandler}
                                autoFocus
                            />
                            <input
                                type="text"
                                name="description"
                                class="form-control text-center w-50"
                                placeholder="Description"
                                value={description}
                                onChange={changeHandler}
                            />
                            <input
                                type="number"
                                name="price"
                                class="form-control text-center w-50"
                                placeholder="Product Price"
                                value={price}
                                onChange={changeHandler}
                            />
                            <select
                                name="shipping"
                                className="form-control m-auto w-50 mb-3"
                                onChange={changeHandler}
                            >
                                <option>shipping</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <input
                                type="number"
                                name="quantity"
                                class="form-control text-center w-50"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={changeHandler}
                            />
                            <select
                                name="brand"
                                className="form-control m-auto w-50 mb-3"
                                onChange={changeHandler}
                            >
                                <option>Select Category</option>
                                {brands.map((brnd) => (
                                    <option key={brnd} value={brnd}>
                                        {brnd}
                                    </option>
                                ))}
                            </select>

                            <div
                                class="mx-auto mt-3"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Name which contains atleast 1 character will enable this button"
                            >
                                <button class="btn btn-primary" type="submit">
                                    Create Now&nbsp;&nbsp;
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
