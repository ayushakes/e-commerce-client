import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import techPlaceholder from "../assets/images/techPlaceholder.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

function AdminProductCard({ product, handleRemove }) {
  const { title, description, images, slug } = product;

  const coverImage = images && images.length ? images[0].url : "";

  return (
    <Card
      cover={
        <img
          style={{ height: "150px", objectFit: "cover" }}
          src={coverImage || techPlaceholder}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => {
            handleRemove(slug);
          }}
        />,
      ]}
    >
      <Meta title={title} description={`${description.substring(0, 40)}...`} />
    </Card>
  );
}

export default AdminProductCard;
