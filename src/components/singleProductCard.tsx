import React from "react";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import techPlaceholder from "../assets/images/techPlaceholder.png";
import ProductInfo from "./productInfo";
import StarRating from "react-star-ratings";
import RatingsModal from "./modals/ratingsModal";
import AverageRatings from "./averageRatings";

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProductCard = ({ product, onClickStarRatings, star }) => {
  const { title, description, images, slug, _id } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel autoPlay showArrows infiniteLoop>
            {images.map((image) => (
              <div style={{ height: 400, width: 600 }}>
                <img
                  src={image.url}
                  style={{ objectFit: "cover" }}
                  key={image.public_id}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={techPlaceholder}
                style={{ height: 400, width: 600, objectFit: "cover" }}
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description ? description : null}
          </TabPane>
          <TabPane tab="More" key="2">
            Call on this xx xxxx xxx to know more abt the product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-10">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          AverageRatings(product)
        ) : (
          <div className="text-center pt-5 pb-3"> No Ratings yet </div>
        )}

        <Card
          //   cover={
          //     <img
          //       style={{ height: "150px", objectFit: "cover" }}
          //       src={coverImage || techPlaceholder}
          //     />
          //   }
          actions={[
            <>
              <HeartOutlined className="text-danger"> </HeartOutlined>
              <Link to="/" className="text-info">
                Add to whishlist{" "}
              </Link>
            </>,
            <>
              <ShoppingCartOutlined
                className="text-success"
                onClick={() => {}}
              />{" "}
              <br /> Add to cart{" "}
            </>,
            <RatingsModal>
              {" "}
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onClickStarRatings}
                isSelectable // if false , it becomes non editable
                starRatedColor="green"
              />
            </RatingsModal>,
          ]}
        >
          <Meta title={title} description={description} />
          <ProductInfo product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
