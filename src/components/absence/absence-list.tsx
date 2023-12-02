import React, { useContext, useEffect, useState } from "react";
import "./absence.css";
import { Content } from "antd/es/layout/layout";
import App from "../../App";
import { Button, Col, Popconfirm, Row, Space, Table, message } from "antd";
import { RESPONSIVE_FOR_TABLE } from "../../constants/contants";
import Search from "antd/es/input/Search";
import AbsencePost from "./absence-post";
import { AppContext } from "../../context/app-context";
import { Absence } from "../../models/absence";
import {
  bookingAbsence,
  fetchAbsences,
  removeAbsence,
} from "../../services/absence-service";

const AbsenceList: React.FC = () => {
  const { employee } = useContext(AppContext);
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {}, [absences]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 100);
    return () => clearTimeout(timer);
  }, [keyword]);

  function fetchData() {
    fetchAbsences(keyword).then((response) => {
      const dataWithNo = response?.data.map((item: any, index: number) => ({
        ...item,
        key: index,
        no: index + 1,
      }));
      setAbsences(dataWithNo);
    });
  }

  const handleSubmit = async (absence: Absence) => {
    if (absence.type == 1) {
      const absenceReqSingle = {
        leaveType: absence.leaveType,
        type: absence.type,
        fromDateSingle: absence.fromDateSingle,
        shiftTypeSingle: absence.shiftTypeSingle,
        reason: absence.reason,
        applicationUserId: employee?.userId,
      };
      try {
        const result = await bookingAbsence(absenceReqSingle);
        if (result != null) {
          fetchData();
          message.success("Booking absence success !");
        }
      } catch (error) {
        throw error;
      }
    } else {
      const absenceReqMultiple = {
        leaveType: absence.leaveType,
        type: absence.type,
        fromDateMulti: absence.fromDateMulti,
        shiftTypeFromDateMulti: absence.shiftTypeFromDateMulti,
        toDateMulti: absence.toDateMulti,
        shiftTypeToDateMulti: absence.shiftTypeToDateMulti,
        reason: absence.reason,
        applicationUserId: employee?.userId,
      };
      try {
        const result = await bookingAbsence(absenceReqMultiple);
        if (result != null) {
          fetchData();
          message.success("Booking absence success !");
        }
      } catch (error) {
        throw error;
      }
    }
  };

  async function handleDelete(id: number) {
    try {
      const result = await removeAbsence(id);
      if (result != null) {
        const updatedAbsences = absences.filter((item) => item.id !== id);
        const updatedAbsencesWithNo = updatedAbsences.map((item, index) => ({
          ...item,

          no: index + 1,
        }));
        setAbsences(updatedAbsencesWithNo);
        message.success("Remove absence success !");
      }
    } catch (error) {
      throw error;
    }
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
      width: "5%",
    },
    {
      title: "Employee name",
      dataIndex: "employeeName",
      key: "employeeName",
      width: "10%",
    },
    {
      title: "Dates",
      dataIndex: "fromDateSingle",
      key: "fromDateSingle",
      sorter: true,
      width: "15%",
      render: (text: any, record: Absence) => {
        if (record.type === 1) {
          return record.fromDateSingle;
        } else if (record.type === 2) {
          return `${record.fromDateMulti} - ${record.toDateMulti}`;
        }
        return null;
      },
    },
    {
      title: "Leave type",
      dataIndex: "leaveType",
      key: "shiftType",
      width: "10%",
    },
    {
      title: "Shift type",
      dataIndex: "shiftTypeSingle",
      key: "type",
      width: "15%",
      render: (text: any, record: Absence) => {
        if (record.type === 1) {
          return record.shiftTypeSingle;
        } else if (record.type === 2) {
          return `${record.shiftTypeFromDateMulti} - ${record.shiftTypeToDateMulti}`;
        }
        return null;
      },
    },
    {
      title: "Hour deducted",
      dataIndex: "hourDeducted",
      key: "hourDeducted",
      width: "10%",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: "25%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: any, record: Absence | any) => (
        <Space size="middle">
          <Popconfirm
            title="Remove the absence"
            description="Are you sure to remove this absence ?"
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
          <div className="absence-content">
            <Row>
              <Col span={12}>
                <h2>Absence list</h2>
                <div className="button-add">
                  <AbsencePost handleSubmit={handleSubmit} />
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

            <div className="absence-list">
              <Table
                columns={columns}
                dataSource={absences}
                scroll={{ x: RESPONSIVE_FOR_TABLE.x }}
              />
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};
export default AbsenceList;
