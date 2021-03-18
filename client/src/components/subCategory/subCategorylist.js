import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSubCategories } from "../../functions/sub-category";

const SubCategorylist = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllSubCategories().then((res) => {
            setSubCategories(res.data);
            setLoading(false);
        });
    }, []);

    const showsubCategories = () =>
        subCategories.map((sub) => (
            <Link
                to={`/sub-category/${sub.slug}`}
                key={sub._id}
                className="col btn btn-outline-secondary btn-md btn-raised m-2 d-flex align-items-center justify-content-center"
            >
                <p className="h6 small">{sub.name}</p>
            </Link>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <h2 className="text-center">Laoding...</h2>
                ) : (
                    showsubCategories()
                )}
            </div>
        </div>
    );
};

export default SubCategorylist;
