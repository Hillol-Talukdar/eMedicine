import React, { useEffect, useState } from "react";
import AdminPageNav from "../../../components/navbar/AdminPageNavbar";
import { getProductByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeAProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

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

    const handleRemove = (slug) => {
        if (window.confirm("Are you sure, you want to delete?")) {
            // console.log("send delete req", slug);
            removeAProduct(slug, user.token)
                .then((res) => {
                    toast.error(`"${res.data.title}" is deleted.`);
                    loadAllProducts();
                })
                .catch((err) => {
                    if (err.response.status === 400)
                        toast.error(err.response.data);
                    // console.log(err);
                });
        }
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
                            <div className="row mx-auto">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="col-md-4 pb-2"
                                    >
                                        <AdminProductCard
                                            product={product}
                                            handleRemove={handleRemove}
                                        />
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
