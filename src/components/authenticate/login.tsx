import React, { useEffect, useState, useContext } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Space,
  message,
} from "antd";
import "./authenticate.css";
import { AuthReq, AuthRes } from "../../models/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../constants/axios";
import { HOST, LOGIN } from "../../constants/contants";
import { AppContext } from "../../context/app-context";

const Login: React.FC = () => {
  const { setEmployee } = useContext(AppContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      await instance
        .post<AuthReq>(HOST + LOGIN, {
          userName,
          password,
        })
        .then((response) => {
          const data = response.data;
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("refresh token", data.refreshToken);
          localStorage.setItem("user", JSON.stringify(data));

          const storedUserJSON = localStorage.getItem("user");
          let newUser: AuthRes | null = null;
          if (storedUserJSON !== null) {
            const storedUser = JSON.parse(storedUserJSON) as AuthRes;
            newUser = { ...storedUser };
          }
          setEmployee(newUser);
          message.success("Login success !");
          navigate("/home");
        });
    } catch (error) { }
  };
  return (
    <>
      <Row className="default-layout container-fluid">
        <Col lg={14} xs={24}>
          <Row className="login-form">
            <Row className="content">
              <Col span={24}>
                <Col span={24} className="login-title">
                  <Space size="middle" direction="vertical">
                    <Col span={24} className="big-title fw-bold">
                      <h1>Login</h1>
                    </Col>
                  </Space>
                </Col>
                <Form
                  onFinish={handleSubmit}
                  layout="vertical"
                  name="login-form"
                  size="large"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setUserName(e.target.value)} />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Typography.Link href="/forgot-password">
                      <p className="forgot-password">Forgot your password ?</p>
                    </Typography.Link>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="full-width"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col lg={10} xs={0} className="left-content">
          <Row className="left-background">
            <img
              className="sign-up-img"
              src={
                "https://www.shrm.org/publishingimages/shrm-sharing-logo-square-v6.png"
              }
              alt="sign-up-background"
            />
          </Row>
        </Col>
      </Row>
      <ToastContainer position="top-center" />
    </>
  );
};
export default Login;
