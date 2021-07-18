import React, { useState } from "react";
import { auth } from "../../firebase";
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";

const Password = () => {
  const [loading, setLoading] = useState(false);

  const passwordUpdateForm = () => {};

  const onFormSubmit = async (formValues) => {

    setLoading(true);
    await auth.currentUser.updatePassword(formValues.password).then(
      ()=>{
        setLoading(false);
        toast.success("password updated")
      }
    ).catch((err)=>{
      setLoading(false);
      toast.error(err.message)
    });
  };

  return (
    <div className="form-group">
      <Form onSubmit={onFormSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="password" placeholder="password">
              {({ input, meta, placeholder }) => (
                <div>
                  <label>Your password</label>
                  <input
                    {...input}
                    placeholder={placeholder}
                    className="form-control"
                    disabled={loading}
                  />
                </div>
              )}
            </Field>

            <button className="btn btn-primary" type="submit" disabled={submitting}>Submit</button>
          </form>
        )}
      </Form>
    </div>
  );
};

export default Password;
