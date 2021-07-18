import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/adminNav";
import { Switch } from "react-router-dom";
import { getProductsByCount } from "../../functions/product";
import Loader from "../../components/loader";
import AdminProductCard from "../../components/adminProductCard";

const AdminDashboard = () => {
  
  return (
    <div className="flex">
      <div className="mr-20">
        <AdminNav />
      </div>
    </div>
  );
};

export default AdminDashboard;
