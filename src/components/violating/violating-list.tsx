import App from "../../App";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CheckInRecord } from "../../models/check-in-record";
import { ColumnsType } from "antd/es/table";
import { Col, Row, Table, message } from "antd";
import Search from "antd/es/input/Search";
import { RESPONSIVE_FOR_TABLE } from "../../constants/contants";
import "./violating.css";
import { fetchCheckInTime } from "../../services/check-in-record-service";
import moment from 'moment';


const ViolatingList: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [keyword, setKeyword] = useState("");
    const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>([]);
    const [pagination, setPagination] = useState({
        pageSize: 5,
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
    });
    const columns: ColumnsType<CheckInRecord> = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: "5%",
            align: 'center',
            render: (_, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
            width: "15%",
            sorter: {
                compare: (a, b) => {
                    const fullNameA = a.fullName ?? '';
                    const fullNameB = b.fullName ?? '';

                    return fullNameA.localeCompare(fullNameB);
                },
                multiple: 2,
            },
            align: 'center'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: "10%",
            sorter: {
                compare: (a, b) => {
                    const dateA = a.date ?? '';
                    const dateB = b.date ?? '';

                    return dateA.localeCompare(dateB);
                },
                multiple: 2,
            },
            align: 'center'
        },
        {
            title: 'Check-in time',
            dataIndex: 'checkInTime',
            key: 'checkInTime',
            width: "10%",
            align: 'center'
        },
        {
            title: 'Number of minutes late',
            dataIndex: 'minutesLate',
            key: 'minutesLate',
            width: "10%",
            align: 'center'
        },
    ];
    useEffect(() => {
        if (successMessage) {
            message.success(successMessage);
        }
    }, [successMessage]);
    useEffect(() => {
        getAllCheckInTime();
    }, [pagination.current, pagination.pageSize]);
    useEffect(() => {
        const timer = setTimeout(() => {
            getAllCheckInTime();
        }, 100);
        return () => clearTimeout(timer);
    }, [keyword]);

    function getAllCheckInTime() {
        fetchCheckInTime(setSuccessMessage, keyword, pagination.current, pagination.pageSize)
            .then((response) => {
                if (response?.data) {
                    const dataWithNo = response.data.results.map((item: any, index: number) => {
                        const minutesLateInMinutes = item.minutesLate * 60;
                        const formattedDate = moment(item.date, 'DD/MM/YYYY').format('DD/MM/YYYY');
                        const formattedCheckInTime = moment(item.checkInTime, 'DD/MM/YYYY HH:mm:ss A').format('HH:mm');
                        return {
                            ...item,
                            no: (pagination.current - 1) * pagination.pageSize + index + 1,
                            minutesLate: minutesLateInMinutes,
                            date: formattedDate,
                            checkInTime: formattedCheckInTime,
                        };
                    });
                    setCheckInRecords(dataWithNo);
                    setPagination((prev) => ({
                        ...prev,
                        total: response.data.total,
                    }));
                }
            })
            .catch((error) => {
                message.error("Error fetching data");
            });
    };

    const handleInputChange = (event: any) => {
        const { value } = event.target;
        setKeyword(value);
    };

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
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
                    <div className="violating-content">
                        <Row>
                            <Col span={12}>
                                <h2>Violating list</h2>

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
                        <div className="violating-list">
                            <Table
                                columns={columns}
                                dataSource={checkInRecords}
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
    )

}
export default ViolatingList;