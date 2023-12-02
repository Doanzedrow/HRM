import App from "../../App";
import { Content } from "antd/es/layout/layout";
import { Col, Row } from "antd";
import "./recruitment.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecruitment } from "../../services/recruitment-service";

const RecruitmentDetail = () => {
  const { id } = useParams<{ id: string | any }>();
  const createMarkup = (htmlString: string) => ({ __html: htmlString });
  const initialState = {
    positionId: "",
    salaryMin: 0,
    salaryMax: 0,
    category: 0,
    applicationUserId: "",
    jobDescription: "",
    createAt: "",
    positionName: "",
    employeeName: "",
  };
  const [recruitment, setRecruitment] = useState(initialState);
  useEffect(() => {
    getRecruitment(id).then((response) => {
      setRecruitment(response);
    });
  }, []);
  return (
    <>
      <App />
      <Content
        className="site-layout"
        style={{
          backgroundColor: "#f0f2f5",
          padding: "0 50px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <div className="recruitment-content">
            <h2>Recruitment details</h2>
            <div className="recruitment-information">
              <Row gutter={16}>
                <Col lg={8} xs={24} span={12}>
                  <Row>
                    <div className="text-label">
                      <strong>Position: </strong>
                      <span> {recruitment.positionName}</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="text-label">
                      <strong>Create at: </strong>
                      <span> {recruitment.createAt}</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="text-label">
                      <strong>Author: </strong>
                      <span> {recruitment.employeeName}</span>
                    </div>
                  </Row>
                </Col>
                <Col lg={8} xs={24} span={12}>
                  <Row>
                    <div className="text-label">
                      <strong>Employee category: </strong>
                      <span>{recruitment.category}</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="text-label">
                      <strong>Salary min: </strong>
                      <span>{recruitment.salaryMin}</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="text-label">
                      <strong>Salary max: </strong>
                      <span>{recruitment.salaryMax}</span>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col lg={12} xs={24} span={12}>
                  <div className="text-label">
                    <strong>Job description: </strong>
                  </div>
                  <div
                    className="text-job-description"
                    dangerouslySetInnerHTML={createMarkup(
                      recruitment.jobDescription
                    )}
                  ></div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};
export default RecruitmentDetail;
