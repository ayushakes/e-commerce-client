import React, { useEffect, useState } from "react";
import { Link, Switch } from "react-router-dom";
import AdminNav from "../../../components/nav/adminNav";
import { useSelector } from "react-redux";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../functions/subCategory";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
import { Modal } from "antd";
import SubCategoryUpdateModal from "./subCategoryUpdateModal";
import { getCategories } from "../../../functions/category";

const AdminSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: any) => ({ ...state }));
  const [subCategories, setSubCategories] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [currentSubCategory, setCurrentSubCategory] = useState<any>({});

  const [keyword, setKeyword] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadSubCategories();
    loadCategories();
    return () => {};
  }, []);

  const loadSubCategories = () =>
    getSubCategories().then((res) => {
      setSubCategories(res.data);
    });

  const loadCategories = () =>
    getCategories().then((res) => {
      setCategories(res.data);
    });

  const onFormSubmit = (formValues) => {
    setLoading(true);
    createSubCategory(
      { name: formValues.name, parent: formValues.category },
      user.token
    )
      .then((res) => {
        setLoading(false);
        toast.success("sub category created successfully");
        loadSubCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
      });
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Delete sub category?")) {
      setLoading(true);

      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success("Category deleted successfully ");
          loadSubCategories();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err);
        });
    }
  };

  const onModalSubmit = () => {
    setOpenModal(false);
    loadSubCategories();
  };
  const onCancelModal = () => {
    setOpenModal(false);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const subCategoryForm = (
    <div className="form-group">
      <Form
        onSubmit={onFormSubmit}
        initialValues={{
          name: "",
          category: categories && categories.length ? categories[0]._id : null,
        }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" placeholder="name">
              {({ input, meta, placeholder }) => (
                <div>
                  <label>Sub category name</label>
                  <input
                    {...input}
                    placeholder={placeholder}
                    className="form-control"
                    disabled={submitting}
                  />
                </div>
              )}
            </Field>

            <Field name="category" placeholder="select category">
              {({ input, meta, placeholder }) => (
                <div className="mt-10">
                  <label>category</label>
                  <select
                    {...input}
                    placeholder={placeholder}
                    className="form-control"
                    disabled={submitting}
                  >
                    {categories &&
                      categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </Field>

            <button
              className="btn btn-primary mt-10"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>
          </form>
        )}
      </Form>
    </div>
  );

  return (
    <div className="flex w-full">
      <div className="mr-20">
        <AdminNav />
      </div>
      <div className="w-full">
        <div> {subCategoryForm}</div>
        <div>
          <input
            type="search"
            placeholder="search sub category"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
        <div className="mt-10 p-10">
          {subCategories.filter(searched(keyword)).map((subCategory) => {
            return (
              <div
                key={subCategory._id}
                className="border border-1 alert alert-secondary flex items-center"
              >
                <div>{subCategory.name} </div>
                <div className="ml-auto">
                  {" "}
                  <button
                    onClick={() => handleDelete(subCategory.slug)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setCurrentSubCategory(subCategory);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </div>
              </div>
            );
          })}
          <SubCategoryUpdateModal
            user={user}
            open={openModal}
            subCategory={currentSubCategory}
            onModalSubmit={onModalSubmit}
            onCancelModal={onCancelModal}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSubCategory;
