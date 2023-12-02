import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  MenuProps,
  Modal,
  Row,
} from "antd";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import {
  DownOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { AppContext } from "./context/app-context";
import "./App.css";
import ChangePassword from "./components/authenticate/change-password";
const { Content } = Layout;

const App = () => {
  const { employee } = useContext(AppContext);
  const [open, setopen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "3") {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } else if (e.key == "2") {
      setShowChangePassword(true);
    }
  };

  const showModal = () => {
    setopen(true);
  };

  const handleOk = () => {
    setopen(false);
  };

  const handleCancel = () => {
    setopen(false);
  };
  const handleSubmit = (event: any) => { };
  const itemsHeader = [
    {
      label: (
        <img
          className="logo-header"
          src="https://d11p36kvaeudqt.cloudfront.net/logos/SHRM_BlocksTag_KO.svg"
          alt=""
        />
      ),
      key: "Logo",
    },
    {
      label: (
        <Link className="label-menu" to="/home">
          Home
        </Link>
      ),
      key: "One",
    },
    {
      label: "Department",
      key: "Two",
      children: [
        {
          label: (
            <Link className="label-menu" to="/department-list">
              Department list
            </Link>
          ),
          key: "Department list",
        },
        {
          label: (
            <Link className="label-menu" to="/position-list">
              Position list
            </Link>
          ),
          key: "Position list",
        },
      ],
    },
    {
      label: "Recruitment",
      key: "Three",
      children: [
        {
          label: (
            <Link className="label-menu" to="/recruitment-list">
              Recruitment list
            </Link>
          ),
          key: "Recruitment list",
        },
        {
          label: (
            <Link className="label-menu" to="/candidate-list">
              Candidate list
            </Link>
          ),
          key: "Candidate list",
        },
      ],
    },
    {
      label: "Employee",
      key: "Four",
      children: [
        {
          label: "My profile",
          key: "My profile",
        },
        {
          label: (
            <Link className="label-menu" to="/employee-list">
              Employee list
            </Link>
          ),
          key: "Employee list",
        },
        {
          label: (
            <Link className="label-menu" to="/payroll-list">
              Payroll list
            </Link>
          ),
          key: "Payroll list",
        },
      ],
    },
    {
      label: "Timesheet",
      key: "Five",
      children: [
        {
          label: (
            <Link className="label-menu" to="/absence-list">
              Absence
            </Link>
          ),
          key: "Absence",
        },
        {
          label: (
            <Link className="label-menu" to="/holiday-config">
              Holiday Config
            </Link>
          ),
          key: "Holiday Config",
        },
        {
          label: (
            <Link className="label-menu" to="/violating-list">
              Violating list
            </Link>
          ),
          key: "Violating list",
        }
      ],
    },
    {
      label: "Report",
      key: "Six",
      children: [
        {
          label: "HR Report",
          key: "HR Report",
        },
      ],
    },
  ];

  const itemsProfile = [
    {
      label: "My profile",
      key: "1",
      icon: <ProfileOutlined />,
    },
    {
      label: "Change password",
      key: "2",
      icon: <UnlockOutlined />,
    },
    {
      label: "Log out",
      key: "3",
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps = {
    items: itemsProfile,
    onClick: handleMenuClick,
  };
  return (
    <>
      {showChangePassword && (
        <ChangePassword
          onClose={() => setShowChangePassword(false)}
          open={true}
        />
      )}
      <Header style={{ backgroundColor: "#fff" }}>
        <Row justify="space-between">
          <Col span={20} lg={20} xs={10}>
            <Menu mode="horizontal" items={itemsHeader}></Menu>
          </Col>
          <Col span={4} xs={12} lg={4}>
            <Dropdown.Button
              menu={menuProps}
              icon={<DownOutlined />}
              className="dropdown-header"
            >
              {employee?.fullName}
            </Dropdown.Button>
          </Col>
        </Row>
      </Header>
    </>
  );
};
export default App;
