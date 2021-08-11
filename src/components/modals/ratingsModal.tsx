import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const RatingsModal = ({ children }) => {
  const { user } = useSelector((state: any) => ({ ...state }));
  const history = useHistory();
  const params: any = useParams();
  const { slug } = params;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (user && user.token) {
      setOpen(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleOpenModal}>
        <StarOutlined /> <br />{" "}
        {user ? "Leave ratings" : "Login to leave a rating"}
      </div>
      <Modal
        centered
        visible={open}
        title="Leave a rating"
        onOk={() => {
          setOpen(false);
          toast.info("thanks for your ratings it will appear soon ");
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        {children}
        {open}
      </Modal>
    </>
  );
};

export default RatingsModal;
