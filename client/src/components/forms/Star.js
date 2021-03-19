import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
    <>
        <StarRating
            changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            starDimension="20px"
            starSpecing="2px"
            starHoverColor="#ffd700"
            starEmptyColor="#ffd700"
            starRatedColor="red"
        />
        <br />
    </>
);

export default Star;
