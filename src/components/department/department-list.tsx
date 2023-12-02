import React, { useEffect, useState } from "react";
import { Col, Row, Button, Space, Popconfirm, message } from "antd";
import Search from "antd/es/input/Search";
import DepartmentPost from "./department-post";
import {
  fetchDepartments,
  addDepartment,
  deleteDepartment,
  updateDepartment,
} from "../../services/department-service";
import { Department } from "../../models/department";
import Table from "antd/es/table";
import "./department.css";
import { ToastContainer, toast } from "react-toastify";
import DepartmentUpdate from "./department-update";
import { Content } from "antd/es/layout/layout";
import App from "../../App";
import { useNavigate } from "react-router-dom";

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const respone = await fetchDepartments();
      setDepartments(respone);
    } catch (err: any) {}
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  async function handleSumbit(department: Department) {
    const departmentReq = {
      id: department.id,
      name: department.name,
    };
    try {
      const result = await addDepartment(departmentReq);
      setDepartments((prevDepartment) => [...prevDepartment, result]);
      message.success("Department add success!");
    } catch (err: any) {
      throw err;
    }
  }

  async function handleUpdate(id: string, department: Department) {
    const departmentReq = {
      name: department.name,
    };
    try {
      await updateDepartment(id, departmentReq);
      message.success("Department update success!");
      fetchData();
    } catch (err: any) {
      throw err;
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDepartment(id);
      setDepartments([...departments.filter((x) => x.id !== id)]);
      message.success("Department delete success!");
    } catch (err: any) {
      throw err;
    }
  }

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      width: "10%",
      render: (_: any, __: any, index: number) => index + 1,
    },

    {
      title: "Department",
      dataIndex: "name",
      key: "name",
      with: "50%",
      sorter: {
        compare: (a: Department, b: Department) => a.name.localeCompare(b.name),
        multiple: 3,
      },
    },
    {
      title: "Action",
      key: "action",
      with: "40%",
      render: (_: any, record: Department | any) => (
        <Space size="middle">
          <DepartmentUpdate
            key={record.id}
            department={record}
            handleUpdate={handleUpdate}
          />
          <Popconfirm
            title="Delete the department"
            description="Are you sure to delete this department ?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Delete</Button>
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
          padding: "0 50px",
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <div className="department-content">
            <Row>
              <Col span={12}>
                <h2>Department list</h2>
                <div className="search-form">
                  <Search placeholder="Enter name" allowClear />
                </div>
              </Col>
              <Col span={12}>
                <DepartmentPost handleSubmit={handleSumbit} />
              </Col>
            </Row>
            <div className="department-list">
              <Table columns={columns} dataSource={departments} />
            </div>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </Content>
    </>
  );
};
export default DepartmentList;
