import { Button, Card, Input } from "antd";
import { useEffect, useState } from "react";
import { blogDelete, blogList } from "../../services/blog";
import moment from "moment";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Meta } = Card;

const List = () => {
  const [list, setList] = useState([]);
  //   const login = () => {
  //     return;
  //   };

  useEffect(() => {
    blogList().then((response) => {
      setList(response.data?.data);
    });
  }, []);

  const deleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        blogDelete(id).then((response) => {
          if (response.data.status === "success") {
            Swal.fire({
              title: "Deleted!",
              text: "Your blog has been deleted.",
              icon: "success",
            }).then((result2) => {
              if (result2.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete blog.",
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="row" style={{ padding: "30px" }}>
        <div
          className="col-md-12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "white", textAlign: "left" }}>Blog List</h2>
          <div>
            <Button
              className="mx-2"
              onClick={() => (window.location.href = "/blog/create")}
            >
              Create
            </Button>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Logout!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }
                });
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        {list.map((item) => {
          return (
            <div className="col-md-4">
              <Card
                className="loginCard my-3"
                actions={[
                  <a href={`/blog/view/${item._id}`}>
                    <EyeOutlined key="view" />
                  </a>,
                  <a href={`/blog/edit/${item._id}`}>
                    <EditOutlined key="edit" />
                  </a>,
                  <a onClick={() => deleteBlog(item?._id)}>
                    <DeleteOutlined key="delete" />
                  </a>,
                ]}
              >
                <Meta
                  title={item.title || "N/A"}
                  style={{ textAlign: "left" }}
                />
                <p className="m-0 mt-3" style={{ textAlign: "left" }}>
                  Author : {item.author?.full_name || "N/A"}
                </p>
                <p className="m-0" style={{ textAlign: "left" }}>
                  Published on :{" "}
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <p className="m-0" style={{ textAlign: "left" }}>
                  Updated at :{" "}
                  {moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
