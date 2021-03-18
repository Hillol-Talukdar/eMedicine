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
                className="col btn btn-outline-secondary btn-lg btn-block btn-raised m-2"
            >
                <div className="m-2">
                    {sub.name}
                </div>
                
            </Link>

            // <div
            //     key={sub._id}
            //     className="col btn btn-outline-secondary btn-lg btn-block btn-raised m-2"
            // >
            //     <Link to={`/sub-category/${sub.slug}`} className="text-dark">
            //         {sub.name}
            //     </Link>
            // </div>
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
