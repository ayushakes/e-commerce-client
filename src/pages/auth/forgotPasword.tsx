import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../store/reducers/actionTypes";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";

const ForgotPasword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: any) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL, // where that email link will redirect to
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("check your email for password reset link ");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-1/2">
          <h3 className="h2 mb-20">Forgot Email </h3>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              autoFocus
            />
            <br />
            <button className="btn btn-raised" disabled={!email}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasword;
