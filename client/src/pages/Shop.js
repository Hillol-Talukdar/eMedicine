import React, { useState, useEffect } from "react";
import { getProductByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import UserProductCard from "../components/cards/UserProductCard";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductByCount(12)
            .then((res) => {
                //console.log(res.data)
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                // console.log(err);
                setLoading(false);
            });
    };

    return (
        <div className="container.fluid">
            <div className="row">
                <div className="col-md-3">Search Menu</div>
                <div className="col-md-9">
                    {loading ? (
                        <h4 className="ml-auto text-primary">Loading.....</h4>
                    ) : (
                        <h3 className="text-light text-center pt-2 pb-3 mt-3 mb-3 jumbotron bg-secondary">
                            Products
                        </h3>
                    )}
                    {products.length < 1 && <p>No Products Found!</p>}
                    <div className="row">
                        {products.map((pr) => (
                            <div key={pr._id} className="col-md-4 mb-2">
                                <UserProductCard product={pr} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
