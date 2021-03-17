import React, { useEffect, useState } from "react";
import { getAProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        laodSingleProduct();
    }, [slug]);

    const laodSingleProduct = () =>
        getAProduct(slug).then((res) => setProduct(res.data));

    const onClickStart = (newRating, name) => {
        setStar(newRating);
        productStar(name, star, user.token).then((res) => {
            console.log("Rating clicked", res.data);
            laodSingleProduct();
        });
    };

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct
                    product={product}
                    onClickStart={onClickStart}
                    star={star}
                />
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related products</h4>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Product;
