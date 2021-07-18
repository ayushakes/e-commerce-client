import React, { useEffect, useState } from "react";

import AdminProductCard from "../../../components/adminProductCard";
import Loader from "../../../components/loader";
import AdminNav from "../../../components/nav/adminNav";
import { getProductsByCount } from "../../../functions/product";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(5)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error while loading products", err);
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full">
      <div className="mr-20">
        <AdminNav />
      </div>
      <div className="w-full">
        <div>
          <div>{loading ? <Loader /> : <h4>All Products</h4>}</div>
          <div className="row">
            {" "}
            {products.length
              ? products.map((product) => (
                  <div className="col-md-4">
                    <AdminProductCard key={product._id} product={product} />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
