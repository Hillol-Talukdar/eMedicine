import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
    const {
        price,
        category,
        subCategory,
        shipping,
        brand,
        sold,
        quantity,
    } = product;
    return (
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Price{" "}
                <span className="label label-default label-pill pull-xs-right">
                    &#2547; {price}
                </span>
            </li>

            {category && (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Category{" "}
                    <Link
                        to={`/category/${category.slug}`}
                        className="label label-default label-pill pull-xs-right"
                    >
                        {category.name}
                    </Link>
                </li>
            )}

            {subCategory && (
                <li className="list-group-item  d-flex justify-content-between align-items-center">
                    sub Categories
                    {subCategory.map((subCat) => (
                        <Link
                            key={subCat._id}
                            to={`/sub-category/${subCat.slug}`}
                            className="label label-default label-pill pull-xs-right"
                        >
                            {subCat.name}
                        </Link>
                    ))}
                </li>
            )}

            <li className="list-group-item d-flex justify-content-between align-items-center">
                Shipping{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {shipping}
                </span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
                Brand{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {brand}
                </span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
                Available{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {quantity}
                </span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
                Sold{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {sold}
                </span>
            </li>
        </ul>
    );
};

export default ProductListItems;
