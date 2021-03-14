import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { getProductByCount } from "../functions/product";
import UserProductCard from "../components/cards/UserProductCard";
import Jumbotron from "../components/cards/Jumbotron";
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductByCount(10).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    return (
        <div>
            <div className="jumbotron text-center bg-secondary mb-3">
                <div class="container pb-3 pt-4">
                    <h1 className="text-light">
                        <Jumbotron
                            text={[
                                "Welcome To eMedicine!",
                                "Get The Best Deal!",
                                "Save up to 80% instantly!",
                            ]}
                        />
                    </h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-3">
                            <UserProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
