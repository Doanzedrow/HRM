import React, { useContext, useEffect, useState } from "react";
import App from "../../App";
import { deletePosition, addPosition, updatePosition, getPosition, fetchPositions } from "../../services/position-service";
import { fetchDepartments } from "../../services/department-service";
import { Button, Col, Popconfirm, Row, Space, Table, message, Form } from "antd";
import Search from "antd/es/input/Search";
import { AppContext } from "../../context/app-context";
import { Content } from "antd/es/layout/layout";
import PositionPost from "./Position-post";
import '../position/position.css'
import PositionEdit from "./position-update";
import { Position } from "../../models/position";
import { RESPONSIVE_FOR_TABLE } from "../../constants/contants";
import { Department } from "../../models/department";

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';



const PositionList = () => {

  const [positions, setPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchOption, setSearchOption] = useState("position");

  useEffect(() => { }, [positions]);

  //update
  const handleUpdate = async (id: string, position: Position) => {
    //debugger;
    const positionReq = {
      name: position.name,
      departmentId: position.departmentId,
    };
    try {
      await updatePosition(id, positionReq);
      console.log(positionReq);
      message.success("Position update success !");
    } catch (error) {
      throw error;
    }

  };
  const handleSubmit = async (position: Position) => {
    const positionReq = {
      id: position.id,
      name: position.name,
      departmentId: position.departmentId,
    };

    try {
      const result = await addPosition(positionReq);
      console.log("add" + positionReq);
      if (result) {

        setPositions((prevPositions) => [...prevPositions, result]);
        message.success("Position added successfully!");
      } else {
        message.error("Failed to add the position.");
      }
    } catch (error) {
      message.error("An error occurred while adding the position.");
      console.error(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 100);
    return () => clearTimeout(timer);
  }, [keyword]);
  useEffect(() => {
    fetchPositions().then((response) => {
      setPositions(response);
      console.log(response);
    });

  }, []);
  useEffect(() => {
    fetchPositions().then((response) => {
      setPositions(response);

    });
    fetchDepartments().then((response) => {
      setDepartments(response);
    });
  }, []);
  const [form] = Form.useForm();
  //delete
  async function handleDelete(id: string) {
    try {
      await deletePosition(id);
      const updatedPositions = positions.filter((item) => item.id !== id);
      const updatedPositionsWithNo = updatedPositions.map(
        (item, index) => ({
          ...item,
          no: index + 1,
        })
      );
      setPositions(updatedPositionsWithNo);
      message.success("Position delete success !");
    } catch (error) {
      throw error;
    }
  }
  function fetchData() {
    fetchPositions().then((response) => {
      const dataWithNo = response?.data;

      if (dataWithNo) {
        const mappedData = dataWithNo.map((item: any, index: number) => ({
          ...item,
          no: index + 1,
        }));
        setPositions(mappedData);
      }
    });
  }
  //xuat exel
  const exportToExcel = () => {

    const data = filteredPositions.map((position, index) => ({
      No: index + 1,
      Department: departments.find(dep => dep.id === position.departmentId)?.name || "Unknown Department",
      Position: position.name,
    }));


    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'position_data.xlsx');
  };
  //xuat pdf
  const exportToPDF = () => {

    const data = filteredPositions.map((position, index) => ({
      No: index + 1,
      Department: departments.find(dep => dep.id === position.departmentId)?.name || "Unknown Department",
      Position: position.name,
    }));

    const pdf = new jsPDF() as any;

    pdf.autoTable({
      head: [['No', 'Department', 'Position']],
      body: data.map(({ No, Department, Position }) => [No, Department, Position]),
    });

    pdf.save('position_data.pdf');
  };



  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setKeyword(value);
  };
  // //phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  //const paginatedData = positions.slice(startIndex, endIndex);
  //tim kiem
  const handleSearch = (value: string) => {
    setKeyword(value);
  };
  const filteredPositions = keyword
    ? positions.filter((position) =>
      position.name.toLowerCase().includes(keyword.toLowerCase())
    )
    : positions;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
    },
    {
      title: "Department",
      dataIndex: "departmentId",
      key: "departmentId",
      sorter: {
        compare: (a: any, b: any) => {
          const departmentA = departments.find(dep => dep.id === a.departmentId)?.name || "Unknown Department A";
          const departmentB = departments.find(dep => dep.id === b.departmentId)?.name || "Unknown Department B";
          return departmentA.localeCompare(departmentB);
        },
        multiple: 1,
      },
      width: "30%",
      render: (text: any, record: any) => {
        const department = departments.find(dep => dep.id === record.departmentId);
        return department ? department.name : "Unknown Department";
      },
    },

    {
      title: "Position",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_: any, record: Position | any) => (
        <Space size="middle">
          <PositionEdit
            key={record.id}
            handleUpdate={handleUpdate}
            position={record}
          ></PositionEdit>
          <Popconfirm
            title="Delete the position"
            description="Are you sure to delete this position ?"
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
      <Content className="site-layout"
        style={{
          backgroundColor: "#f0f2f5",
          padding: "0 50px",
          minHeight: "100vh",
        }}>
        <div style={{
          padding: 24,
          minHeight: 380,
        }}>
          <div className="position-content">
            <Row>
              <Col span={12}>
                <h2>Position list</h2>
                <div className="search-form">
                  <Search
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    allowClear
                  />
                </div>
              </Col>
              <Col span={12}>
                <PositionPost handleSubmit={handleSubmit} departments={departments} />
              </Col>

            </Row>
            <div className="position-list">
              <Table
                columns={columns}
                dataSource={filteredPositions}
                scroll={{ x: RESPONSIVE_FOR_TABLE.x }}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: positions.length, // Total number of items in your dataset
                  showSizeChanger: false, // Allow changing the page size
                  showQuickJumper: false, // Allow jumping to a specific page
                  onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  },
                }}
              />
              <Col span={12}>
                <Button onClick={exportToExcel}>Export to Excel</Button>
                <Button onClick={exportToPDF}>Export to PDF</Button>
              </Col>
            </div>
          </div>
        </div>

      </Content>
    </>
  );

};

export default PositionList;
