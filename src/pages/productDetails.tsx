import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SingleProductCard from "../components/singleProductCard";
import {
  getProduct,
  getRelatedProducts,
  productStar,
} from "../functions/product";
import { useSelector } from "react-redux";
import ProductCard from "../components/productCard";

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState<any>({});

  const { slug } = match.params;

  const { user } = useSelector((state: any) => ({ ...state }));

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [star, setStar] = useState(0);
  const onClickStarRatings = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        toast.info("rating updated");
        loadProduct();
      })
      .catch((err) => {
        toast.error("rating update failed");
        console.log(err);
      });
  };

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );

      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        getRelatedProducts(res.data._id).then((res) =>
          setRelatedProducts(res.data)
        );
        if (res.data.ratings && user) {
          let existingRatingObject = res.data.ratings.find(
            (ele) => ele.postedBy.toString() === user._id.toString()
          );

          existingRatingObject && setStar(existingRatingObject.star);
        }
      })
      .catch((err) => toast.error("failed to load product"));
  };

  useEffect(() => {
    loadProduct();
  }, [slug]);
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProductCard
          product={product}
          onClickStarRatings={onClickStarRatings}
          star={star}
        />
      </div>

      <div className="row">
        {relatedProducts.length
          ? relatedProducts.map((product) => (
              <div className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))
          : "no related products"}
      </div>
    </div>
  );
};

export default ProductDetails;
