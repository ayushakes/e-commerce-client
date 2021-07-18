import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCategories,
  getCategory,
  updateCategory,
} from "../../../functions/category";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/subCategory";

const CategoryUpdateModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: any) => ({ ...state }));
  const [subCategory, setSubCategory] = useState<any>({});
  const { categories } = props;

  useEffect(() => {
    loadSubCategory();
    return () => {};
  }, [props.open]);

  const loadSubCategory = () =>
    getSubCategory(props.subCategory.slug).then((res) => {
      setSubCategory({ ...res.data });
    });

  const onFormSubmit = (formValues) => {
    updateSubCategory(
      subCategory.slug,
      { name: formValues.name, parent: formValues.category },
      user.token
    )
      .then((res) => {
        setSubCategory({ ...res.data });
        toast.success("category updated successfully");
        props.onModalSubmit();
      })
      .catch((err) => {
        toast.error("category update failed");
      });
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={props.open}
        onOk={props.onModalSubmit}
        onCancel={props.onCancelModal}
      >
        <Form
          initialValues={
            subCategory && subCategory.name
              ? { name: subCategory.name, category: subCategory.parent }
              : undefined
          }
          onSubmit={onFormSubmit}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name" placeholder="name">
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>Name of Sub Category</label>
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
                    <label> parent category</label>
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
                className="btn btn-primary"
                type="submit"
                disabled={submitting}
              >
                Save
              </button>
            </form>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryUpdateModal;
