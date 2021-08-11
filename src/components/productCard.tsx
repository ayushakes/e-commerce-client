import React from "react";
import { Card } from "antd";

import techPlaceholder from "../assets/images/techPlaceholder.png";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import AverageRatings from "./averageRatings";
const { Meta } = Card;

function ProductCard({ product }) {
  const { title, description, images, slug, ratings } = product;

  const coverImage = images && images.length ? images[0].url : "";

  return (
    <>
      {ratings && ratings.length > 0 ? (
        AverageRatings(product)
      ) : (
        <div className="text-center pt-5 pb-3">not rated yet</div>
      )}
      <Card
        cover={
          <img
            style={{ height: "150px", objectFit: "cover" }}
            src={coverImage || techPlaceholder}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View
          </Link>,
          <>
            <ShoppingCartOutlined className="text-danger" onClick={() => {}} />{" "}
            <br /> Add to cart{" "}
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard;
