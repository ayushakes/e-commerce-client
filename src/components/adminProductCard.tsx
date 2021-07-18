import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

function AdminProductCard({ product }) {
  const { title, description, images } = product;

  return (
    <Card
      cover={
        <img
          style={{ height: "150px", objectFit: "cover" }}
          src={images && images.length ? images[0].url : ""}
        />
      }
      actions={[<EditOutlined />,<DeleteOutlined />]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}

export default AdminProductCard;
