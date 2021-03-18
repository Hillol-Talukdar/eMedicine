import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../functions/category";

const Categorylist = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllCategories().then((cats) => {
            setCategories(cats.data);
            setLoading(false);
        });
    }, []);

    const showCategories = () =>
        categories.map((cat) => (
            <Link
                to={`/category/${cat.slug}`}
                key={cat._id}
                className="col btn btn-outline-secondary btn-lg btn-block btn-raised m-2"
            >
                <div className="m-2">{cat.name}</div>
            </Link>

            // <div
            //     key={cat._id}
            //     className="col btn btn-outline-secondary btn-lg btn-block btn-raised m-2"
            // >
            //     <Link to={`/category/${cat.slug}`} className="text-dark">
            //         {cat.name}
            //     </Link>
            // </div>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <h2 className="text-center">Laoding...</h2>
                ) : (
                    showCategories()
                )}
            </div>
        </div>
    );
};

export default Categorylist;
