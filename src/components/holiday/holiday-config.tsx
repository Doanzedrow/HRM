import React, { useEffect, useState } from "react";
import { Col, Row, Input, Form, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import "./holiday.css";
import "antd/lib/style/index";
import App from "../../App";
import { HolidayConfigModel } from "../../models/holiday-config";
import {
  addHolidayConfig,
  fetchHolidayConfig,
} from "../../services/holiday-config-service";
import { ToastContainer, toast } from "react-toastify";
import { message } from "antd/lib";

const HolidayConfig: React.FC = () => {
  const [holidayConfigs, setHolidayConfigs] = useState<HolidayConfigModel[]>(
    []
  );
  const [form] = Form.useForm();

  // // Check admin
  // const adminId = "eb02173c-16a5-47dd-a8de-c014514dfba2";

  // const getUserFormLocalStorage = localStorage.getItem("user") ?? '';

  // const user = JSON.parse(getUserFormLocalStorage);

  // const [isAdmin, setIsAdmin] = useState(false);

  //   if(adminId === user.userId){
  //     setIsAdmin(true);
  //   }

  useEffect(() => {
    fetchHolidayConfig().then((response) => {
      setHolidayConfigs(response.data);
      const latestHolidayConfig = response.data[response.data.length - 1];
      form.setFieldsValue(latestHolidayConfig);
    });
  }, []);

  async function handleSubmit(holidayConfig: HolidayConfigModel) {
    const key = async (e: any) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    };
    try {
      const _holidayConfig = await addHolidayConfig(holidayConfig);
      message.success("Holiday Config add success");
    } catch (err: any) {
      throw err;
    }
  }

  function handleInputChange(e: any) {    
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    const temp = sanitizedValue;
    const { name, value } = temp;
    setHolidayConfigs({ ...holidayConfigs, [name]: value });
  }

  const handleKeyDown = (e: any) => {
    const char = e.key.toLowerCase();
    if (char === "e" || char === "-" || char === "+") {
      e.preventDefault();
    }
    const keyCode = e.keyCode || e.which;
    if(keyCode >=37 && keyCode <= 40){
      e.preventDefault();
    }
  };
  return (
    <>
      <App />
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
          backgroundColor: "#f0f2f5",
        }}
      >
        <div style={{ padding: 24, minHeight: 380 }}>
          <h2>Holiday configuration</h2>
          <p style={{ color: "blue", fontSize: "18px" }}>Leave configuration</p>
          <Form form={form} onFinish={handleSubmit}>
            <p style={{ fontWeight: "bold" }}>General</p>
            <Row gutter={48}>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <Row>
                  <Col span={24}>
                    {/* Annual leave */}
                    <Row
                      style={{
                        alignItems: "center",
                        padding: "10px 0  ",
                      }}
                    >
                      <Col span={10}>
                        <span>Annual leave</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="annualLeave"
                          rules={[
                            {
                              required: true,
                              message: "Please input Annual leave",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="annualLeave"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Wedding leave */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10}>
                        <span>Wedding leave</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="weddingLeave"
                          rules={[
                            {
                              required: true,
                              message: "Please input wedding leave",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="weddingLeave"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Compassionate leave */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10}>
                        <span>Compassionate leave</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="compassionateLeave"
                          rules={[
                            {
                              required: true,
                              message: "Please input compassionate leave",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="compassionateLeave"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Absence form must send before */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10}>
                        <span>Absence form must send before</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="absenceFormMustSendBefore"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please input absence form must send before",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="absenceFormMustSendBefore"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Maternity leave */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10}>
                        <span>Maternity leave</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="maternityLeave"
                          rules={[
                            {
                              required: true,
                              message: "Maternity leave paternity leave",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="maternityLeave"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Paternity leave */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10}>
                        <span>Paternity leave</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="paternityLeave"
                          rules={[
                            {
                              required: true,
                              message: "Paternity leave paternity leave",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="paternityLeave"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <Row>
                  <Col span={24}>
                    {/* One more child  */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <span>One more child</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="oneMoreChild"
                          rules={[
                            {
                              required: true,
                              message: "Please input one more child",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="oneMoreChild"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Adoption leave */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <span>Adoption leave</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="adoptionLeave"
                          rules={[
                            {
                              required: true,
                              message: "Please input adoption leave",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="adoptionLeave"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Sick leave*/}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <span>Sick leave</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="sickLeave"
                          rules={[
                            {
                              required: true,
                              message: "Please input sick leave",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="sickLeave"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Child sick leave under 3 year old  */}
                    <Row style={{ alignItems: "center", padding: "10px 0" }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <span>Child sick leave under 3 year old</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="childSickLeaveUnder3YearsOld"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please input child sick leave under 3 year old",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="childSickLeaveUnder3YearsOld"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                    {/* Child sick leave under 7 year old  */}
                    <Row style={{ alignItems: "center", margin: "10px 0" }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <span>Child sick leave under 7 year old</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          style={{ margin: "0 20px 0 0" }}
                          name="childSickLeaveUnder7YearsOld"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please input child sick leave under 7 year old",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            size="middle"
                            name="childSickLeaveUnder7YearsOld"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: "center" }}>
                        <span>days</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button
                  type="primary"
                  className="btn-submit"
                  size="large"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
          <ToastContainer position="bottom-right" />
        </div>
      </Content>
    </>
  );
};

export default HolidayConfig;
