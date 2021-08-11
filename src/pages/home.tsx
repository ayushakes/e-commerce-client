import React, { useState, useEffect } from "react";
import Jumbotron from "../components/jumbotron";
import Loader from "../components/loader";
import LoadingCards from "../components/loadingCards";
import UserNav from "../components/nav/userNav";
import ProductCard from "../components/productCard";
import { getProductsPaginated, getTotalProducts } from "../functions/product";
import { Pagination } from "antd";
import CategoryList from "../components/categoryList";
import SubCategoryList from "../components/subCategoryList";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsTotalCount, setProductsTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const loadLatestproducts = () => {
    setLoading(true);
    getProductsPaginated("createdAt", "desc", page)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadLatestproducts();
  }, [page]);

  useEffect(() => {
    getTotalProducts().then((res) => setProductsTotalCount(res.data));
  }, []);

  return (
    <div className="border-2">
      <div>home page</div>
      <div className="jumbotron text-danger h1 font-weight-bold">
        <Jumbotron
          text={[
            "New Arrivals",
            "In your way",
            "pick them up",
            "to clear your way",
            "this is our site",
            "this is our way",
          ]}
        />
      </div>

      {loading ? (
        <LoadingCards count={3} />
      ) : products.length ? (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}{" "}
        </div>
      ) : null}

      <div>
        <Pagination
          current={page}
          total={(productsTotalCount / 3) * 10}
          onChange={(val) => setPage(val)}
        />
      </div>

      <br />
      <div className="jumbotron text-danger h3 font-weight-bold">
        {" "}
        Categories
      </div>
      <br />
      <CategoryList />

      <div className="jumbotron text-danger h3 font-weight-bold">
        {" "}
        SubCategories
      </div>
      <br />
      <SubCategoryList />
    </div>
  );
}
