import React, { useEffect, useState } from "react";
import { Link, Switch } from "react-router-dom";
import AdminNav from "../../../components/nav/adminNav";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
import { Modal } from "antd";
import CategoryUpdateModal from "./categoryUpdateModal";

const AdminCategory = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: any) => ({ ...state }));
  const [categories, setCategories] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [currentCategory, setCurrentCategory] = useState<any>({});

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    return () => {};
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => {
      setCategories(res.data);
    });

  const onFormSubmit = (formValues) => {
    setLoading(true);
    createCategory({ name: formValues.name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success("category created successfully");
        loadCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
      });
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Delete category?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success("Category deleted successfully ");
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err);
        });
    }
  };

  const onModalSubmit = () => {
    setOpenModal(false);
    loadCategories();
  };
  const onCancelModal = () => {
    setOpenModal(false);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const categoryForm = (
    <div className="form-group">
      <Form onSubmit={onFormSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" placeholder="name">
              {({ input, meta, placeholder }) => (
                <div>
                  <label>Name of category</label>
                  <input
                    {...input}
                    placeholder={placeholder}
                    className="form-control"
                    disabled={submitting}
                  />
                </div>
              )}
            </Field>

            <button
              className="btn btn-primary"
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
        <div>{loading ? <Loader /> : categoryForm}</div>
        <div>
          <input
            type="search"
            placeholder="search category"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
        <div className="mt-10 p-10">
          {categories.filter(searched(keyword)).map((category) => {
            return (
              <div
                key={category._id}
                className="border border-1 alert alert-secondary flex items-center"
              >
                <div>{category.name} </div>
                <div className="ml-auto">
                  {" "}
                  <button
                    onClick={() => handleDelete(category.slug)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setCurrentCategory(category);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </div>
              </div>
            );
          })}
          <CategoryUpdateModal
            user={user}
            open={openModal}
            category={currentCategory}
            onModalSubmit={onModalSubmit}
            onCancelModal={onCancelModal}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
