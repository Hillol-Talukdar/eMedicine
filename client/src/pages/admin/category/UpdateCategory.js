import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getACategory, updateACategory } from "../../../functions/category";

const UpdateCategory = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(match);
        loadCategory();
    }, []);

    const loadCategory = () =>
        getACategory(match.params.slug).then((cat) => setName(cat.data.name));

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        updateACategory(match.params.slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(
                    `${res.data.name} category is updated successfully!`
                );
                history.push("/admin/category");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const updateCategoryForm = () => (
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
                disabled={loading || name.length < 2}
            >
                Update Now&nbsp;&nbsp;
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
                                Updating Category...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center">
                                Update Category Now
                            </h4>
                        )}
                        {updateCategoryForm()}
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
