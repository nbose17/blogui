import { Button, Card, Input } from "antd";
import { loginUser } from "../../services/auth";
import { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const login = () => {
    if (!userDetails.email || !userDetails.password) {
      Swal.fire("Warning", "Please enter all fields", "warning");
      return;
    }

    loginUser(userDetails)
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isAuthenticated", true);
          Swal.fire("Success", "Logged in successfully", "success").then(
            (response) => {
              if (response.isConfirmed) {
                window.location.href = "/blog/list";
              }
            }
          );
        }
      })
      .catch((error) =>
        Swal.fire("Invalid Credentials", error.response.data.message, "error")
      );
  };

  return (
    <div className="container">
      <div className="row vh-100 d-flex justify-content-center align-items-center">
        <div className="col-md-4" />
        <div className="col-md-4">
          <Card className="loginCard">
            <h2>Login</h2>
            <Input
              placeholder="Email"
              className="mt-3"
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
              }}
            />
            <Input.Password
              placeholder="Password"
              className="mt-3"
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
            />
            <Button onClick={login} className="mt-3">
              Log In
            </Button>
          </Card>
        </div>
        <div className="col-md-4" />
      </div>
    </div>
  );
};

export default Login;
