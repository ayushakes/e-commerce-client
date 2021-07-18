import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../functions/category";

const CategoryUpdateModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: any) => ({ ...state }));
  const [category, setCategory] = useState<any>({});

  useEffect(() => {
    console.log(props);
    loadCategory();
  }, [props.open]);

  const loadCategory = () => {
    getCategory(props.category.slug)
      .then((res) => {
        setCategory({ ...res.data });
      })
      .catch((err) => {
        toast.error("failed to load category");
      });
  };

  const onFormSubmit = (formValues) => {

    console.log(user.token)
    updateCategory(category.slug, { name: formValues.name }, user.token)
      .then((res) => {
        setCategory({...res.data});
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
        <Form initialValues={{ name: category.name }} onSubmit={onFormSubmit}>
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
      </Modal>
    </div>
  );
};

export default CategoryUpdateModal;
