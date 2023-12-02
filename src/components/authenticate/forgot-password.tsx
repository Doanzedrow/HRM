import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React from "react";
import "./authenticate.css";
const ForgotPassword = () => {
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
                      <h2>Forgot password</h2>
                    </Col>
                  </Space>
                </Col>
                <Form layout="vertical" name="login-form" size="large">
                  <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Typography.Link href="/login">
                      <p className="forgot-password">Login</p>
                    </Typography.Link>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="full-width"
                    >
                      Forgot password
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
    </>
  );
};
export default ForgotPassword;
