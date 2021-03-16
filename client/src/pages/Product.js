import React, { useEffect, useState } from "react";
import { getAProduct } from "../functions/product";

const Product = ({ match }) => {
    const [product, setProduct] = useState({});

    const { slug } = match.params;

    useEffect(() => {
        laodSingleProduct();
    }, [slug]);

    const laodSingleProduct = () =>
        getAProduct(slug).then((res) => setProduct(res.data));

    return <>{JSON.stringify(product)}</>;
};

export default Product;
