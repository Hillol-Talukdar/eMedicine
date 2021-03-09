import React, { useState, useEffect } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getACategory, updateACategory } from "../../../functions/category";
import Categoryform from "../../../components/forms/Categoryform";

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
                toast.success(`Category is updated successfully!`);
                history.push("/admin/category");
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
                                Updating Category...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center">
                                Update Category Now
                            </h4>
                        )}

                        <Categoryform
                            submitHandler={submitHandler}
                            name={name}
                            setName={setName}
                            loading={loading}
                            btnName="Update Now"
                        />

                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
