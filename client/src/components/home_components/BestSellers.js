import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { getProducts } from "../../functions/product";
import UserProductCard from "../cards/UserProductCard";
import Jumbotron from "../cards/Jumbotron";
import CardLoading from "../cards/CardLoading";
const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProducts("sold", "desc", 4)
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
        </div>
    );
};

export default BestSellers;
