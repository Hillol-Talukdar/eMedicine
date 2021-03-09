import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createACategory,
    getAllCategories,
    removeACategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";

const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadAllCategories();
    }, []);

    const loadAllCategories = () =>
        getAllCategories().then((cat) => setCategories(cat.data));

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        createACategory({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(
                    `${res.data.name} category is created successfully!`
                );
                loadAllCategories();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Are you sure, you to delete?")) {
            setLoading(true);
            removeACategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} Category is Deleted!`);
                    loadAllCategories();
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400)
                        toast.error(err.response.data);
                });
        }
    };

    const createCategoryForm = () => (
        <form
            class="d-flex align-items-center flex-column"
            onSubmit={submitHandler}
        >
            <input
                type="text"
                class="form-control text-center w-50"
                placeholder="Category Name"
                disabled={loading}
                value={name}
                required
                autoFocus
                onChange={(e) => setName(e.target.value)}
            />
            <button
                class="btn btn-primary mt-3"
                type="submit"
                disabled={loading}
            >
                Create Now&nbsp;&nbsp;
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
        </form>
    );

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
                                Creating Category...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center">
                                Create Category Now
                            </h4>
                        )}
                        {createCategoryForm()}
                        <hr />
                        <div className="d-flex flex-wrap justify-content-start">
                            {categories.map((cat) => (
                                <div className="m-auto">
                                    <div
                                        className="alert alert-primary text-dark m-3 row"
                                        style={{ width: "18rem" }}
                                        key={cat._id}
                                    >
                                        <h6 className="mt-1 col-8">
                                            {cat.name}
                                        </h6>

                                        <span
                                            className="btn btn-sm col-2"
                                            onClick={() =>
                                                handleRemove(cat.slug)
                                            }
                                            style={{ float: "right" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-trash text-danger mb-1"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                />
                                            </svg>
                                        </span>
                                        <Link
                                            className="btn btn-sm col-2"
                                            style={{ float: "right" }}
                                            to={`/admin/category/${cat.slug}`}
                                        >
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
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
