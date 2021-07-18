import React, { useEffect,useState } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../components/loadingToRedirect";
import { currentAdmin } from "../functions/auth";

const AdminRoute = (props) => {
  const { children, ...restProps } = props;
  const { user } = useSelector((state: any) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current Admin res", res);
          setOk(true);
        }) 
        .catch((err) => {
          console.log("Admin Route error", err);

          setOk(false);
        });
    }
  }, [user]);
  return ok ? (
    <Route {...restProps} />
  ) : (
    <div className="text-danger">
      <LoadingToRedirect forAdmin/>
    </div> // to do redirect the user to another page if not allowed
  );
};

export default AdminRoute;
