import { hot } from "react-hot-loader/root";

import React, { useEffect } from "react";
import logo from "./logo.svg";

import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { Switch, Route } from "react-router-dom";
import Header from "./components/nav/header";
import { toast, ToastContainer } from "react-toastify";
import RegisterComplete from "./pages/auth/registerComplete";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { LOGGED_IN_USER } from "./store/reducers/actionTypes";
import ForgotPasword from "./pages/auth/forgotPasword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/history";
import UserRoute from "./routes/userRoute";
import Wishlist from "./pages/user/wishlist";
import Password from "./pages/user/password";
import AdminRoute from "./routes/adminRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminCategory from "./pages/admin/category/adminCategory";
import AdminSubCategory from "./pages/admin/subCategory/adminSubCategory";
import ProductCreate from "./pages/admin/product/productCreate";
import AdminProducts from "./pages/admin/products/adminProducts";
import ProductEdit from "./pages/admin/product/productEdit";
import ProductDetails from "./pages/productDetails";
import CategoryHome from "./pages/categoryHome";
import SubCategoryHome from "./pages/subCategoryHome";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // checking firebase auth state
    // trying to access the current user from firebase
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(); // getting JWT

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: res.data.name, // fields coming from backend are name , role and _id
                role: res.data.role,
                _id: res.data._id,
                email: user.email,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => {});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot-password" exact component={ForgotPasword} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={AdminCategory} />
        <AdminRoute
          path="/admin/subCategory"
          exact
          component={AdminSubCategory}
        />
        <AdminRoute path="/admin/product" exact component={ProductCreate} />
        <AdminRoute path="/admin/products" exact component={AdminProducts} />
        <AdminRoute path="/admin/product/:slug" exact component={ProductEdit} />
        <Route path="/product/:slug" exact component={ProductDetails} />
        <Route path="/category/:slug" exact component={CategoryHome} />
        <Route path="/subCategory/:slug" exact component={SubCategoryHome} />
      </Switch>
    </>
  );
}

export default hot(App);
