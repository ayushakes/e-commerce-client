import React from "react";
import logo from "./logo.svg";

import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { Switch, Route } from "react-router-dom";
import Header from "./components/nav/header";
import { ToastContainer } from "react-toastify";

function App() {
  return (<>
  <Header />
  <ToastContainer />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch></>
  );
}

export default App;
