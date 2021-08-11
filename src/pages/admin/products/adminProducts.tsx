import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminProductCard from "../../../components/adminProductCard";
import Loader from "../../../components/loader";
import LoadingCards from "../../../components/loadingCards";
import AdminNav from "../../../components/nav/adminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: any) => ({ ...state }));

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

  const handleRemove = (slug) => {
    let answer = window.confirm("Delete the product?");
    if (answer) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.success(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log("error in request product delete ");
        });
    }
  };

  return (
    <div className="flex w-full">
      <div className="mr-20">
        <AdminNav />
      </div>
      <div className="w-full">
        <div>
          <div>
            {loading ? <LoadingCards count={3} /> : <h4>All Products</h4>}
          </div>
          <div className="row">
            {" "}
            {products.length
              ? products.map((product) => (
                  <div className="col-md-4">
                    <AdminProductCard
                      handleRemove={handleRemove}
                      key={product._id}
                      product={product}
                    />
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
