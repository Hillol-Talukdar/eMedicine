import React, { useState, useEffect } from "react";
import { getACategory } from "../../functions/category";
import UserProductCard from "../../components/cards/UserProductCard";

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getACategory(slug).then((res) => {
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, []);

    return (
        <div className="conatiner">
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h3 className="text-light text-center pt-3 pb-3 mb-3 jumbotron bg-secondary">
                            Loading...
                        </h3>
                    ) : (
                        <h3 className="text-light text-center pt-3 pb-3 mb-3 jumbotron bg-secondary">
                            {products.length} Product(s) in "{category.name}"{" "}
                            category
                        </h3>
                    )}
                </div>
            </div>

            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-md-3">
                        <UserProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryHome;
