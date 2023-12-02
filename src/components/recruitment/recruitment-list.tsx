import React, { useContext, useEffect, useState } from "react";
import App from "../../App";
import { Recruitment } from "../../models/recruitment";
import {
  addRecruitment,
  deleteRecruitment,
  fetchRecruitments,
  updateRecruitment,
} from "../../services/recruitment-service";
import { ToastContainer, toast } from "react-toastify";
import { Button, Col, Popconfirm, Row, Space, Table, message } from "antd";
import { Content } from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import RecruitmentPost from "./recruitment-post";
import "./recruitment.css";
import { AppContext } from "../../context/app-context";
import { RESPONSIVE_FOR_TABLE } from "../../constants/contants";
import RecruitmentEdit from "./recruitment-update";

const RecruitmentList: React.FC = () => {
  const { employee } = useContext(AppContext);
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {}, [recruitments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 100);
    return () => clearTimeout(timer);
  }, [keyword]);

  function fetchData() {
    fetchRecruitments(keyword).then((response) => {
      const dataWithNo = response?.data.map((item: any, index: number) => ({
        ...item,
        key: index,
        no: index + 1,
      }));
      setRecruitments(dataWithNo);
    });
  }
  async function handleDelete(id: string) {
    try {
      await deleteRecruitment(id);
      const updatedRecruitments = recruitments.filter((item) => item.id !== id);
      const updatedRecruitmentsWithNo = updatedRecruitments.map(
        (item, index) => ({
          ...item,

          no: index + 1,
        })
      );
      setRecruitments(updatedRecruitmentsWithNo);
      message.success("Recruitment delete success !");
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (recruitment: Recruitment) => {
    const recruitmentReq = {
      jobDescription: recruitment.jobDescription,
      salaryMin: recruitment.salaryMin,
      salaryMax: recruitment.salaryMax,
      category: recruitment.category,
      positionId: recruitment.positionId,
      applicationUserId: employee?.userId,
    };
    try {
      const result = await addRecruitment(recruitmentReq);
      // const updatedRecruitments = recruitments.map((item, index) => ({
      //   ...item,
      //   no: index + 1,
      // }));
      fetchData();
      message.success("Recruitment add success !");
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async (id: string, recruitment: Recruitment) => {
    const recruitmentReq = {
      jobDescription: recruitment.jobDescription,
      salaryMin: recruitment.salaryMin,
      salaryMax: recruitment.salaryMax,
      category: recruitment.category,
      positionId: recruitment.positionId,
      applicationUserId: employee?.userId,
      version: recruitment.version,
    };
    try {
      const result = await updateRecruitment(id, recruitmentReq);
      if (result != null) {
        fetchData();
        message.success("Recruitment update success !");
      }
    } catch (error) {
      throw error;
    }
  };

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
      title: "Position",
      dataIndex: "positionName",
      key: "name",
      sorter: true,
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "employeeName",
      key: "author",
      sorter: true,
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_: any, record: Recruitment | any) => (
        <Space size="middle">
          <RecruitmentEdit
            key={record.id}
            handleUpdate={handleUpdate}
            recruitment={record}
          ></RecruitmentEdit>
          <a href={`/recruitment-detail/${record.id}`}>Detail</a>
          <Button>Candidates</Button>
          <Popconfirm
            title="Delete the recruitment"
            description="Are you sure to delete this recruitment ?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Remove</Button>
          </Popconfirm>
        </Space>
      ),
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
          <div className="recruitment-content">
            <Row>
              <Col span={12}>
                <h2>Recruitment list</h2>
                <div className="button-add">
                  <RecruitmentPost handleSubmit={handleSubmit} />
                </div>
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
            <div className="recruitment-list">
              <Table
                columns={columns}
                dataSource={recruitments}
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
export default RecruitmentList;
