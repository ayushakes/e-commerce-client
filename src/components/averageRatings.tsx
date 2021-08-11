import React from "react";
import StarRating from "react-star-ratings";

const AverageRatings = (product) => {
  let result;
  let ratingsArray = product.ratings;
  if (product && product.ratings) {
    let total = [];
    let length = ratingsArray.length;
    ratingsArray.map((rating) => total.push(rating.star));
    let totalReduce = total.reduce((acc, nextValue) => acc + nextValue, 0);
    result = totalReduce / length;
  }
  return (
    <div className="text-center pt-5 pb-3 ">
      <StarRating
        rating={result}
        starDimension="20px"
        starRatedColor="red"
        editing={false}
      />
      <span className="ml-2">({ratingsArray.length})</span>
    </div>
  );
};

export default AverageRatings;
