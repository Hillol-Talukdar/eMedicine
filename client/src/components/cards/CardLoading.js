import React from "react";
import { Card, Skeleton } from "antd";

const CardLoading = ({ cardCount }) => {
    const cards = () => {
        let totalCards = [];
        for (let i = 0; i < cardCount; i++) {
            totalCards.push(
                <Card className="col m-3">
                    <Skeleton active></Skeleton>
                </Card>
            );
        }
        return totalCards;
    };

    return <div className="row pb-5">{cards()}</div>;
};

export default CardLoading;
