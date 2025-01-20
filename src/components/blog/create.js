import { Button, Card, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { blogCreate, blogList } from "../../services/blog";
import moment from "moment";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RichTextEditor from "react-rte";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";

const { Meta } = Card;

const Create = () => {
  const [details, setDetails] = useState({
    title: "",
    message: "",
  });

  const create = () => {
    if (details.title === "") {
      Swal.fire("Warning", "Please enter a title.", "warning");
      return;
    }

    if (details.message === "") {
      Swal.fire("Warning", "Please enter a message.", "warning");
      return;
    }

    blogCreate(details).then((response) => {
      if (response.data.status == "success") {
        Swal.fire("Success", "Blog created successfully.", "success").then(
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
          <h2 style={{ color: "white", textAlign: "left" }}>Create Blog</h2>

          <Card className="loginCard my-3" style={{ textAlign: "left" }}>
            <Typography.Title level={5}>Title</Typography.Title>
            <Input
              className="mt-1 mb-3"
              placeholder="Title"
              value={details.title}
              onChange={(e) =>
                setDetails({ ...details, title: e.target.value })
              }
            />

            <Typography.Title level={5}>Message</Typography.Title>
            <ReactQuill
              theme="snow"
              value={details.message}
              onChange={(e) => setDetails({ ...details, message: e })}
            />
            <Button type="primary" onClick={create} className="my-3">
              Create
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

export default Create;
