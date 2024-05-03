import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.user.role);
        navigate("/home",{ state: { user: res.data.user } });
      })
      .catch((err) => {
        console.log(err);

        const divToInject = document.getElementsByClassName("errorDivL");

        Array.from(divToInject).forEach((element) => {
          if (element instanceof HTMLElement) {
            const newChild = document.createElement("p");
            newChild.textContent = "Invalid Credentials!";
            element.append(newChild); // Append the error message

            // Schedule the removal of the error message after 3 seconds (adjust as needed)
            setTimeout(() => {
              element.removeChild(newChild); // Remove the error message
            }, 5000); // 3000 milliseconds = 3 seconds
          }
        });
      });
  };
  return (
    <>
      <div className="login">
        <div className="loginSideImage"></div>

        <div className="loginRightSide">
          <img src="./assets/logo.png" alt="fastlogo" />
          <div className="loginTitle">
            <h1>FYP PORTAL</h1>
          </div>

          <div>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button id="loginButton" variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
          <div className="errorDivL"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
