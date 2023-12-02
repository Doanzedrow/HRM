import App from "../../App";
import { Content } from "antd/es/layout/layout";
import { ToastContainer } from "react-toastify";
import { Col, Row, Table, Space, message, Button, Select } from "antd";
import { RESPONSIVE_FOR_TABLE } from "../../constants/contants";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { Payroll } from "../../models/payroll";
import { ColumnsType } from "antd/es/table";
import { addPayroll, fetchAllPayroll } from "../../services/payroll-service";
import moment from "moment";
const PayrollList: React.FC = () => {
    const { Option } = Select;
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [payrolls, setPayroll] = useState<Payroll[]>([]);
    const [keyword, setKeyword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1799 }, (_, i) => 1800 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [pagination, setPagination] = useState({
        pageSize: 5,
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
    });
    const columns: ColumnsType<Payroll> = [
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
            title: 'Month',
            dataIndex: 'date',
            key: 'date',
            width: "10%",
            sorter: {
                compare: (a, b) => {
                    const dateA = a.date.toString() ?? '';
                    const dateB = b.date.toString() ?? '';
                    return dateA.localeCompare(dateB);
                },
                multiple: 1,
            },
            align: 'center'
        },
        {
            title: 'Hour deducted',
            dataIndex: 'hoursWorking',
            key: 'hoursWorking',
            width: "10%",
            align: 'center'
        },
        {
            title: 'Minutes violating',
            dataIndex: 'minutesLate',
            key: 'minutesLate',
            width: "10%",
            align: 'center'
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
            width: "10%",
            align: 'center'
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: "10%",
            align: 'center'
        },
    ];
    const handleInputChange = (event: any) => {
        const { value } = event.target;
        setKeyword(value);
    };
    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };
    useEffect(() => {
        if (successMessage) {
            message.success(successMessage);
        }
    }, [successMessage]);
    useEffect(() => {
        if (errorMessage) {
            message.error(errorMessage);
        }
    }, [errorMessage]);
    useEffect(() => {
        getAllPayroll();
    }, [pagination.current, pagination.pageSize]);
    useEffect(() => {
        const timer = setTimeout(() => {
            getAllPayroll();
        }, 100);
        return () => clearTimeout(timer);
    }, [keyword]);

    function getAllPayroll(mounth?: number, year?: number) {
        fetchAllPayroll(setSuccessMessage, keyword, pagination.current, pagination.pageSize, mounth, year)
            .then((response) => {
                if (response?.data) {
                    const dataWithNo = response.data.results.map((item: any, index: number) => {
                        const formattedDate = moment(item.date, 'DD/MM/YYYY').format('MM/YYYY');
                        const formattedSalary = item.salary.toLocaleString('vi-VN');
                        const formattedTotal = item.total.toLocaleString('vi-VN');
                        return {
                            ...item,
                            no: (pagination.current - 1) * pagination.pageSize + index + 1,
                            date: formattedDate,
                            salary: formattedSalary,
                            total: formattedTotal
                        };
                    });
                    setPayroll(dataWithNo);
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

    const handlePayroll = async () => {
        const payrollReq = {
            date: new Date(),
        };
        try {
            const result = await addPayroll(payrollReq, setErrorMessage, setSuccessMessage);
            setPayroll([...payrolls, result]);
            getAllPayroll();
        } catch (error) {
        }
    }
    const handleMonthChange = (value: any) => {
        setSelectedMonth(value);
    };

    const handleYearChange = (value: any) => {
        setSelectedYear(value);
    };

    const handleFilter = async () => {
        getAllPayroll(selectedMonth, selectedYear);
    }

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
                                <h2>Payroll list</h2>
                                <div className="button-add">
                                    <Button type="primary" onClick={() => handlePayroll()}>
                                        Payroll
                                    </Button>

                                </div>
                                <div className="search-form">
                                    <Search
                                        onChange={handleInputChange}
                                        placeholder="Enter name"
                                        allowClear
                                    />
                                </div>

                                <Row style={{ marginTop: 20 }}>
                                    <Col span={4} style={{ marginRight: 20 }}>
                                        <Select value={selectedMonth} style={{ width: 120 }} onChange={handleMonthChange}>
                                            {months.map((month) => (
                                                <Option key={month} value={month}>
                                                    {`Tháng ${month}`}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col span={4} style={{ marginRight: 20 }}>
                                        <Select value={selectedYear} style={{ width: 120 }} onChange={handleYearChange}>
                                            {years.map((year) => (
                                                <Option key={year} value={year}>
                                                    {year}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary" onClick={handleFilter}>
                                            Filter
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <div className="violating-list">
                            <Table
                                columns={columns}
                                dataSource={payrolls}
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
export default PayrollList;