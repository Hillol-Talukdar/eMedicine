import React, { useState, useEffect } from "react";
import { getACategory } from "../../functions/category";
import { Link } from "react-router-dom";
import UserProductCard from "../../components/cards/UserProductCard";

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true);
        getACategory(slug).then((cat) => {
            setCategory(cat.data);
            // setLoading(false);
        });
    }, []);

    return <p>{slug}</p>;
};

export default CategoryHome;
