import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import App from "../../App";
import { Employee, EmployeeStatus } from '../../models/employee';
import { addEmployee, fetchApplication, getEmployeeStatus } from "../../services/employee-service";
import { ToastContainer } from "react-toastify";
import { Col, Row, Table, Space, message, Button } from "antd";
import "./employee.css";
import { Content } from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import type { ColumnsType } from 'antd/es/table';
import EmployeePost from "./employee-post";
import { RESPONSIVE_FOR_TABLE } from "../../constants/contants";
import { Link } from "react-router-dom";
const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [keyword, setKeyword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const { EmployeeStatus } = useParams<{ EmployeeStatus: string | any }>();
  const [pagination, setPagination] = useState({
    pageSize: 2,
    current: 1,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '30'],
  });
  const columns: ColumnsType<Employee> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: "5%",
      align: 'center',
      render: (_, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: "15%",
      sorter: {
        compare: (a, b) => a.fullName.localeCompare(b.fullName),
        multiple: 2,
      },
      align: 'center'
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: "10%",
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: "15%",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 1,
      },
      align: 'center'
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: "10%",
      align: 'center'
    },
    {
      title: 'Department',
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: "10%",
      align: 'center'
    },
    {
      title: 'Employee category',
      dataIndex: 'employmentCategory',
      key: 'employmentCategory',
      width: "15%",
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'employeeStatus',
      key: 'employeeStatus',
      width: "5%",
      align: 'center',
      filters: [
        { text: 'Working', value: 'Working' },
        { text: 'Leaving', value: 'Leaving' },
      ],
      onFilter: (value: any, record: { employeeStatus: string | EmployeeStatus }) => {
        setFilterStatus(value);
        return record.employeeStatus.toString().indexOf(value.toString()) === 0;
      },
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger={record.employeeStatus.toString() === 'Leaving'}>
            {record.employeeStatus}
          </Button>
        </Space>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button >
            <Link className="detail-employee" to={`/employee-detail/${record.id}`}>Detail</Link>
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage);
    }
  }, [errorMessage]);
  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }
  }, [successMessage]);
  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 100);
    return () => clearTimeout(timer);
  }, [keyword]);

  function getAllEmployeeStatus() {
    getEmployeeStatus(filterStatus, pagination.current, pagination.pageSize)
      .then((response) => {
        if (response?.data) {
          const dataWithNo = response.data.results.map((item: any, index: number) => ({
            ...item,
            no: (pagination.current - 1) * pagination.pageSize + index + 1,
          }));
          setEmployees(dataWithNo);
          setPagination((prev) => ({
            ...prev,
            total: response.data.total,
          }));
          console.log(response.data);
        }
      })
      .catch((error) => {
        message.error("Error fetching data");
      });
  };

  useEffect(() => {
    if (filterStatus != "") {
      getAllEmployeeStatus();
    }
    else {
      fetchData()
    }
  }, [filterStatus])

  function fetchData() {
    fetchApplication(setSuccessMessage, keyword, pagination.current, pagination.pageSize)
      .then((response) => {
        if (response?.data) {
          const dataWithNo = response.data.results.map((item: any, index: number) => ({
            ...item,
            no: (pagination.current - 1) * pagination.pageSize + index + 1,
          }));
          setEmployees(dataWithNo);
          setPagination((prev) => ({
            ...prev,
            total: response.data.total,
          }));
        }
      })
      .catch((error) => {
        message.error("Error fetching data");
      });
  }


  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };
  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const handleSubmit = async (employee: Employee) => {
    const employeeReq = {
      code: employee.code,
      fullName: employee.fullName,
      address: employee.address,
      salary: employee.salary,
      gender: employee.gender,
      dob: employee.dob,
      placeOfBirth: employee.placeOfBirth,
      bankAccount: employee.bankAccount,
      bankName: employee.bankName,
      startDate: employee.startDate,
      employeeStatus: employee.employeeStatus,
      employmentCategory: employee.employmentCategory,
      employeeLevel: employee.employeeLevel,
      userName: employee.userName,
      passWord: employee.passWord,
      positionId: employee.positionId,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      formFile: employee.formFile,
      role: employee.role
    };
    try {
      const result = await addEmployee(employeeReq, setErrorMessage, setSuccessMessage);
      setEmployees([...employees, result]);
      fetchData();
    } catch (error) {

    }
  };

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
          <div className="employee-content">
            <Row>
              <Col span={12}>
                <h2>Employee list</h2>
                <div className="button-add">
                  <EmployeePost handleSubmit={handleSubmit} />
                </div>
                <div className="search-form">
                  <Search
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    allowClear
                  />
                </div>
              </Col>
              <Col span={12}>

              </Col>
            </Row>
            <div className="employee-list">
              <Table
                columns={columns}
                dataSource={employees}
                scroll={{ x: RESPONSIVE_FOR_TABLE.x }}
                pagination={pagination}
                onChange={handleTableChange}
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
export default EmployeeList;