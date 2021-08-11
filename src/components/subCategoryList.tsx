import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../functions/category";
import { getSubCategories } from "../functions/subCategory";
import Loader from "./loader";

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories()
      .then((res) => {
        setSubCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("error while fetching subCategories list");
        setLoading(false);
      });
  }, []);
  const renderSubCategories = () => {
    return subCategories.map((subCategory) => (
      <div className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3 col">
        <Link to={`subCategory/${subCategory.slug}`}>{subCategory.name}</Link>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">{loading ? <Loader /> : renderSubCategories()}</div>
    </div>
  );
};

export default SubCategoryList;
