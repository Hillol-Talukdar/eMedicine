import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createAProduct, getAProduct } from "../../../functions/product";
import UpdateProductForm from "../../../components/forms/UpdateProductForm";
import {
    getAllCategories,
    getSelectedSubCategory,
} from "../../../functions/category";
import UploadFile from "../../../components/forms/UploadFile";

const initState = {
    title: "",
    description: "",
    price: "",
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
        "Square Pharmaceuticals Ltd.",
    ],
    brand: "",
};

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState(initState);
    const [categories, setcategories] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [showSubCategory, setShowSubCategory] = useState(false);
    //redux
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [arrayOfSubCategory, setArrayOfSubCategory] = useState([]);

    //router
    const { slug } = match.params;

    useEffect(() => {
        loadAllCategories();
        loadProduct();
    }, []);

    const loadAllCategories = () =>
        getAllCategories().then((cat) => setcategories(cat.data));

    const loadProduct = () => {
        getAProduct(slug).then((product) => {
            setValues({ ...values, ...product.data });

            // load sub-category for single product
            getSelectedSubCategory(product.data.category._id).then((res) => {
                setSubCategoryOptions(res.data);
            });

            // array of sub-category ids to show as default sub-category values in antd select box
            let arr = [];
            product.data.subCategory.map((sub) => {
                arr.push(sub._id);
            });

            setArrayOfSubCategory((prev) => arr); // update prev state. Required to work antd Select
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        createAProduct(values, user.token)
            .then((res) => {
                // console.log(res);
                window.alert(`Product is Updated!`);
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
                            {loading ? (
                                <h4 className="ml-auto text-primary">
                                    Loading Image.....
                                </h4>
                            ) : (
                                <h4 className="ml-auto">Update Product</h4>
                            )}
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
                        {/* <div>{JSON.stringify(values)}</div> */}
                        <UpdateProductForm
                            submitHandler={submitHandler}
                            changeHandler={changeHandler}
                            values={values}
                            setValues={setValues}
                            categories={categories}
                            categorySelectHandler={categorySelectHandler}
                            subCategoryOptions={subCategoryOptions}
                            showSubCategory={showSubCategory}
                            arrayOfSubCategory={arrayOfSubCategory}
                            setArrayOfSubCategory={setArrayOfSubCategory}
                            btnName="Update The Product"
                            btnIcon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil mb-1"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
