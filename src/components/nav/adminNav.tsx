import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column" style={{whiteSpace:"nowrap"}}>
        <li className="nav-item">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/product">Create Product</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/Category">Category</Link>
        </li> 
        <li className="nav-item">
          <Link to="/admin/subCategory">Sub Category</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/password">Coupons</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
