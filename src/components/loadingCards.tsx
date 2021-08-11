import { Card, Skeleton } from "antd";
import React from "react";

const LoadingCards = ({ count }) => {
  const cards = () => {
    let cardsArray = [];

    for (let i = 0; i < count; i++) {
      cardsArray.push(
        <div className="col-md-4">
          <Card>
            {" "}
            <Skeleton active></Skeleton>
          </Card>
        </div>
      );
    }
    return cardsArray;
  };

  return <div className="row">{cards()}</div>;
};

export default LoadingCards;
