import { Button, Card, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { blogCreate, blogEdit, blogList, blogView } from "../../services/blog";
import moment from "moment";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RichTextEditor from "react-rte";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const { Meta } = Card;

const Edit = () => {
  const [details, setDetails] = useState({
    title: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    blogView(params.id).then((response) => {
      setDetails(response.data?.data);
      setMessage(response.data?.data?.message);
    });
  }, []);

  const edit = () => {
    if (details.title === "") {
      Swal.fire("Warning", "Please enter a title.", "warning");
      return;
    }

    if (details.message === "") {
      Swal.fire("Warning", "Please enter a message.", "warning");
      return;
    }

    blogEdit(params.id, { ...details, message: message }).then((response) => {
      if (response.data.status == "success") {
        Swal.fire("Success", "Blog updated successfully.", "success").then(
          (result) => {
            if (result.isConfirmed) {
              window.location.href = "/blog/list";
            }
          }
        );
      } else {
        Swal.fire(
          "Error",
          "Something went wrong! Please try again later.",
          "error"
        );
      }
    });
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="row" style={{ padding: "30px" }}>
        <div className="col-md-12">
          <h2 style={{ color: "white", textAlign: "left" }}>Edit Blog</h2>
          <Card className="loginCard my-3" style={{ textAlign: "left" }}>
            <Typography.Title level={5}>Title</Typography.Title>
            <Input
              className="mt-1 mb-3"
              placeholder="Title"
              value={details?.title}
              onChange={(e) =>
                setDetails({ ...details, title: e.target.value })
              }
            />

            <Typography.Title level={5}>Message</Typography.Title>
            <ReactQuill
              theme="snow"
              value={message}
              onChange={(e) => setMessage(e)}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="my-0 mt-3">
                <b> Author: </b>
                {details?.author_name}
              </p>
              <p className="my-0 mt-3">
                <b> Updated At: </b>
                {moment(details.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
            <Button type="primary" onClick={edit} className="my-3">
              Edit
            </Button>
            <Button
              className="mx-2"
              onClick={() => (window.location.href = "/blog/list")}
            >
              Back
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Edit;
