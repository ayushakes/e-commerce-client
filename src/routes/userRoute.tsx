import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../components/loadingToRedirect";

const UserRoute = (props) => {
  const { children, ...restProps }=props;
  const { user } = useSelector((state: any) => ({ ...state }));
  return user && user.token ? (
    <Route {...restProps} />
  ) : (
    <div className="text-danger"><LoadingToRedirect /></div>  // to do redirect the user to another page if not allowed
  );
};

export default UserRoute;
