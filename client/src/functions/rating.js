import React, { useEffect, useState } from "react";
import Rating from "react-star-ratings";

export const showAverage = (product) => {
    if (product && product.ratings) {
        let ratingsArray = product && product.ratings;
        let totalRating = [];
        let length = ratingsArray.length;
        // console.log("len ", length);
        ratingsArray.map((rat) => totalRating.push(rat.star));
        let totalReduced = totalRating.reduce((p, n) => p + n, 0);
        let heighest = length * 5;
        let result = (totalReduced * 5) / heighest;

        return (
            <div className="text-center d-flex pt-3">
                <span>
                    <Rating
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="#ffd700"
                        editing={false}
                        rating={result}
                    />
                </span>
                <p className="mt-1 text-muted">
                    &nbsp;({product.ratings.length})
                </p>
            </div>
        );
    }
};
