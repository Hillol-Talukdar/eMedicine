import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import UserProductCard from "../cards/UserProductCard";
import CardLoading from "../cards/CardLoading";
import { Pagination } from "antd";

const FeatureProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
    }, [page]);

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data));
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProducts("createdAt", "desc", page)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => console.log("getProducts ERORR " + err));
    };

    return (
        <div>
            <div className="container">
                {loading ? (
                    <CardLoading cardCount={4} />
                ) : (
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-3">
                                <UserProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="row w-100">
                <nav className="col-md-4 offset-md-4 text-center pt-3">
                    <Pagination
                        current={page}
                        total={(productsCount / 4) * 10}
                        onChange={(value) => setPage(value)}
                    />
                </nav>
            </div>
        </div>
    );
};

export default FeatureProducts;
