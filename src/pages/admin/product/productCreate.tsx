import React, { useState, useEffect, useMemo } from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/adminNav";
import { createProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import {
  getCategories,
  getCatgorySubCategories,
} from "../../../functions/category";
import { Select } from "antd";
import FileUpload from "../../../components/fileUpload";

const ProductCreate = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initialState = {
    title: "",
    description: "",
    price: 0,
    category: categories[0] || null,
    subCategories: [],
    shipping: "Yes",
    quantity: 0,
    images: [],
  };

  const [values, setValues] = useState<any>(initialState);

  useEffect(() => {
    loadCategories();
    return () => {};
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => {
      setCategories(res.data);
      setValues({
        ...values,
        category: res.data && res.data.length ? res.data[0]._id : "",
      });
      if (res.data && res.data.length) setSelectedCategory(res.data[0]);

      if (res.data && res.data.length) {
        getCatgorySubCategories(res.data[0]._id)
          .then((response) => {
            console.log(response);
            setSubCategories(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

  const { user } = useSelector((state: any) => ({ ...state }));

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formFinalValues = { ...values };

    createProduct(formFinalValues, user.token)
      .then((res) => {
        toast.success("Product created successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.err);
      });
  };

  const handlefieldChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubCategoriesSelection = (selectedValues) => {
    setSelectedSubCategories(selectedValues);
    let value = selectedValues.map((selected: string) => {
      let subCategory = subCategories.find((sub) => sub._id === selected);
      return subCategory;
    });
    setValues({ ...values, subCategories: selectedValues });
  };

  const handleCategoryChange = (e) => {
    handlefieldChange(e);
    setSelectedSubCategories([]);
    setValues({ ...values, subCategories: [], category: e.target.value });
    const categoryObject = categories.find((cat) => cat._id === e.target.value);

    setSelectedCategory(categoryObject);

    getCatgorySubCategories(e.target.value)
      .then((res) => {
        console.log(res);
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex">
        <div className="mr-20">
          <AdminNav />
        </div>
        <div>
          <form onSubmit={onFormSubmit}>
            <div>
              <label>title</label>
              <input
                type="text"
                name="title"
                value={values["title"]}
                placeholder="title"
                className="form-control"
                onChange={handlefieldChange}
              />
            </div>
            <div>
              <label>description</label>
              <input
                type="text"
                name="description"
                value={values["description"]}
                placeholder="description"
                className="form-control"
                onChange={handlefieldChange}
              />
            </div>

            <div>
              <label>price</label>
              <input
                type="number"
                name="price"
                value={values["price"]}
                placeholder="price"
                className="form-control"
                onChange={handlefieldChange}
              />
            </div>

            {categories.length ? (
              <div>
                <label>category</label>
                <select
                  name="category"
                  value={values["category"]}
                  onChange={handleCategoryChange}
                  placeholder="category"
                  className="form-control"
                >
                  {categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>Categories not loaded</div>
            )}
            {subCategories && subCategories.length ? (
              <>
                <label>Sub Categories</label>
                <Select
                  placeholder="Sub Categories"
                  className="form-control"
                  mode="multiple"
                  value={selectedSubCategories}
                  onChange={handleSubCategoriesSelection}
                >
                  {subCategories.map((subCategory) => (
                    <option value={subCategory._id}>{subCategory.name}</option>
                  ))}
                </Select>
              </>
            ) : null}

            <div>
              <label>shipping</label>
              <select
                name="shipping"
                value={values["shipping"]}
                placeholder="select..."
                className="form-control"
                onChange={handlefieldChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label>quantity</label>
              <input
                type="number"
                name="quantity"
                onChange={handlefieldChange}
                value={values["quantity"]}
                placeholder="quantity"
                className="form-control"
              />
            </div>
            <div>
              <FileUpload
                values={values}
                setValues={setValues}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
            

            <br />
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>{" "}
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
