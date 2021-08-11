import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../functions/category";
import Loader from "./loader";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("error while fetching category list");
        setLoading(false);
      });
  }, []);
  const renderCategories = () => {
    return categories.map((category) => (
      <div className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3 col">
        <Link to={`category/${category.slug}`}>{category.name}</Link>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">{loading ? <Loader /> : renderCategories()}</div>
    </div>
  );
};

export default CategoryList;
