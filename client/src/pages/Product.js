import React, { useEffect, useState } from "react";
import { getAProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import UserProductCard from "../components/cards/UserProductCard";

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const [related, setRelated] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        laodSingleProduct();
    }, [slug]);

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (element) => element.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star);
        }
    });

    const laodSingleProduct = () => {
        getAProduct(slug).then((res) => {
            setProduct(res.data);

            //load related
            getRelated(res.data._id).then((res) => setRelated(res.data));
        });
    };

    const onClickStart = (newRating, name) => {
        setStar(newRating);
        productStar(name, newRating, user.token).then((res) => {
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
                    {/* {JSON.stringify(related)} */}

                    <hr />
                </div>
            </div>

            <div className="row pb-5">
                {related.length ? (
                    related.map((rela) => (
                        <div key={rela._id} className="col-md-3">
                            <UserProductCard product={rela} />
                        </div>
                    ))
                ) : (
                    <div className="text-center col">No Products Found</div>
                )}
            </div>
        </div>
    );
};

export default Product;
