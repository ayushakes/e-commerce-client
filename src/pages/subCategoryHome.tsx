import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import { getSubCategoryProducts } from "../functions/category";

const SubCategoryHome = ({ match }) => {
  const [subCategory, setSubCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSubCategoryProducts(slug)
      .then((res) => {
        setLoading(false);
        setSubCategory(res.data.subCategory);
        setProducts(res.data.products);
      })
      .catch((err) => {
        toast.error("failed to load category products");
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="row">
      {products.length
        ? products.map((product) => (
            <div className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))
        : null}
    </div>
  );
};

export default SubCategoryHome;
