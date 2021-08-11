import React from "react";
import { Link } from "react-router-dom";

const ProductInfo = ({ product }) => {

  const { price, category, subCategories, Shipping, quantity, sold } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subCategories && subCategories.length ? (
        <li className="list-group-item">
          Subcategories{" "}
          {subCategories.map((subCategory) => (
            <Link
              key={subCategory._id}
              to={`/subCategory/${subCategory.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {subCategory.name}
            </Link>
          ))}
        </li>
      ) : null}

      {Shipping && (
        <li className="list-group-item">
          Shipping{" "}
          <span className="label label-default label-pill pull-xs-right">
            {Shipping}
          </span>
        </li>
      )}

      <li className="list-group-item">
        Availaible units{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        sold quantity{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductInfo;
