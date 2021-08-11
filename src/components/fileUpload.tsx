import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FileUpload = (props: {
  values: any;
  setValues(values: object): void;
  loading: boolean;
  setLoading(loading: boolean): void;
}) => {
  const { values, setLoading, setValues, loading } = props;
  const { user } = useSelector((state: { user: any }) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = [...values.images];

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720, // height/width
          720, // height/width
          "JPEG",
          100, //quality
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                { headers: { authtoken: user ? user.token : "" } }
              )
              .then((res) => {
                console.log("Image upload res data", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                toast.error("Error occured while uploading image");
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (imagePublicId) => {
    setLoading(true);
    console.log("request to delete image");
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        {
          public_id: imagePublicId,
        },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((err) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== imagePublicId;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        
   toast.error("error while removing uploaded images")

        setLoading(false);
      });
  };

  return loading ? (
    <LoadingOutlined className="text-danger h1 my-10" />
  ) : (
    <div>
      <div>
        {" "}
        <label>Choose image file/files </label>
        <input
          type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
        />{" "}
      </div>
      <div className="my-10">
        {values.images &&
          values.images.map((image) => (
            <a onClick={() => handleImageRemove(image.public_id)}>
              <Badge key={image.public_id} count="X">
                {" "}
                <Avatar shape="square" src={image.url} size={100} />
              </Badge>
            </a>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
