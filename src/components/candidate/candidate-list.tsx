import React, { useContext, useEffect, useState } from "react";
import App from "../../App";
import { Recruitment } from "../../models/recruitment";
import { fetchCandidates } from "../../services/candidate-service";
import { ToastContainer } from "react-toastify";
import { Button, Col, Row, Table, message } from "antd";
import { Content } from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import "./candidate.css";
import { AppContext } from "../../context/app-context";
import { RESPONSIVE_FOR_TABLE } from "../../constants/contants";

const CandidateList: React.FC = () => {
  const { employee } = useContext(AppContext);
  const [candidates, setCandidates] = useState<Recruitment[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {}, [candidates]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 100);
    return () => clearTimeout(timer);
  }, [keyword]);

  function fetchData() {
    fetchCandidates(keyword).then((response) => {
      const dataWithNo = response?.data.map((item: any, index: number) => ({
        ...item,
        key: index,
        no: index + 1,
      }));
      setCandidates(dataWithNo);
    });
  }

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
      sorter: true,
    },
    {
      title: "Full name",
      dataIndex: "positionName",
      key: "fullName",
      sorter: true,
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "employeeName",
      key: "email",
      sorter: true,
      width: "20%",
    },
    {
      title: "Phone number",
      key: "phoneNumber",
      width: "20%",
    },
    {
      title: "Recruitment name",
      key: "recruitmentName",
      width: "20%",
    },
  ];

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
          <div className="candidate-content">
            <Row>
              <Col span={12}>
                <h2>Candidate list</h2>
                <div className="search-form">
                  <Search
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    allowClear
                  />
                </div>
              </Col>
              <Col span={12}></Col>
            </Row>
            <div className="candidate-list">
              <Table
                columns={columns}
                dataSource={candidates}
                scroll={{ x: RESPONSIVE_FOR_TABLE.x }}
              />
            </div>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </Content>
      <ToastContainer position="bottom-right" />
    </>
  );
};
export default CandidateList;
