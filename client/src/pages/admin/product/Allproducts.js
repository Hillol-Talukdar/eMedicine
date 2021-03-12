import React, { useEffect, useState } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { getProductByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductByCount(100)
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminPageNav />
                </div>
                <div className="col mt-4 mx-5">
                    <div className="">
                        <div className="d-flex justify-content-between border-bottom mb-3 border-2">
                            {loading ? (
                                <h4 className="ml-auto text-primary">
                                    Loading.....
                                </h4>
                            ) : (
                                <h4 className="ml-auto">All Products</h4>
                            )}
                            <h4 className="text-primary mr-auto">eMedicine</h4>
                        </div>
                        {/* <div className="mb-3">{JSON.stringify(products)}</div> */}
                        <div className="col">
                            <div className="row">
                                {products.map((product) => (
                                    <div key={product._id} className="col-md-4">
                                        <AdminProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
