import App from "../../App";
import { Content } from "antd/es/layout/layout";
import { Col, Row, Space, message } from "antd";
import "./employee.css";
import { updateEmployee } from "../../services/employee-service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployee } from "../../services/employee-service";
import format from 'date-fns/format';
import { Tabs, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Employee } from '../../models/employee';
import EmployeeEdit from "./employee-update";
import { IMAGE_URL_AVATAR, RESPONSIVE_FOR_TABLE } from "../../constants/contants";
import NoImage from "../../assets/images/no_image.jpg";
import { useNavigate } from 'react-router-dom';
import { CheckInRecord } from "../../models/check-in-record";
import { fetchCheckInTime, fetchCheckInTimeByUserId } from "../../services/check-in-record-service";
import moment from "moment";
const { TabPane } = Tabs;

const EmployeeDetail = () => {
    const { id } = useParams<{ id: string | any }>();
    const [activeTab, setActiveTab] = useState('1');
    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };
    const [pagination, setPagination] = useState({
        pageSize: 5,
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
    });
    const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>([]);
    const columnsAbsence: ColumnsType<Employee> = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Dates',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: true,
        },
        {
            title: 'Shift type',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Type',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Hour deducted',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Reason',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/employee-detail/${record.id}`}>Remote</a>
                </Space>
            ),
        },
    ];

    const columnsViolating: ColumnsType<CheckInRecord> = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: "5%",
            align: 'center',
            render: (_, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
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
        getAllCheckInTimeByUserId();
    }, [pagination.current, pagination.pageSize]);


    function getAllCheckInTimeByUserId() {
        fetchCheckInTimeByUserId(id, pagination.current, pagination.pageSize)
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



    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };


    const initialState = {
        id: "",
        fullName: "",
        address: "",
        salary: 0,
        gender: 0,
        dob: new Date(),
        placeOfBirth: "",
        bankAccount: "",
        bankName: "",
        startDate: new Date(),
        employeeStatus: 0,
        employmentCategory: 0,
        employeeLevel: 0,
        userName: "",
        passWord: "",
        positionId: "",
        email: "",
        phoneNumber: "",
        departmentName: "",
        avatar: "",
        formFile: undefined as File | undefined,
        role: 0,
        version: ""
    };
    const [employee, setEmployee] = useState(initialState);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const getEmployeeById = async () => {
        try {
            const response = await getEmployee(id, setSuccessMessage, setErrorMessage);

            if (response != null) {
                setEmployee(response.data);
            }
        } catch {
            message.error("User name already exists");
        }
    };
    useEffect(() => {
        getEmployeeById();
    }, []);
    useEffect(() => {
        if (successMessage) {
            message.success(successMessage);
        }
    }, [successMessage]);


    const handleUpdate = async (id: string, employee: Employee) => {
        const employeeReq = {
            id: id,
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
            avatar: employee.avatar,
            formFile: employee.formFile,
            departmentName: employee.departmentName,
            role: employee.role,
            version: employee.version
        };
        try {
            await updateEmployee(id, employeeReq, setSuccessMessage, setErrorMessage);
            getEmployeeById();
            message.success("Update success");

        } catch (error) {
            message.error("User name already exists");
        }
    };

    return (
        <>
            <App />
            <Content className="site-layout-employee">
                <div className="container-employee">
                    <div className="employee-content">
                        <h2>Employee details</h2>
                        <div className="employee-information">
                            <Row gutter={16}>
                                <Col lg={6} xs={24} span={6}>
                                    <Row>
                                        <div className="image-user">
                                            <img src={employee.avatar === "" || employee.avatar === null ? NoImage : IMAGE_URL_AVATAR + employee.avatar} alt="" />
                                        </div>
                                    </Row>

                                </Col>
                                <Col lg={6} xs={24} span={6}>
                                    <Row>
                                        <div className="text-label-employee">
                                            <h3>{employee.fullName}  {employee.gender}</h3>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="text-label-employee">
                                            <span>{employee.address}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="text-label-employee">
                                            <span>M: {employee.phoneNumber} </span>
                                            <span> E: {employee.email}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="text-label-employee btn-edit-employee">
                                            <EmployeeEdit
                                                key={id}
                                                handleUpdate={handleUpdate}
                                                employee={employee}
                                            />
                                        </div>
                                    </Row>
                                </Col>
                                <Col lg={12} xs={24} span={12}>
                                    <Row className="basic-information">
                                        <div className="text-label-employee">
                                            <h3 >Basic information</h3>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Col lg={12} xs={24} span={12}>
                                            <Row>
                                                <div className="text-label-employee">
                                                    <strong>Account name: </strong>
                                                    <span>{employee.bankName}</span>
                                                </div>
                                            </Row>

                                            <Row>
                                                <div className="text-label-employee">
                                                    <strong>Status date: </strong>
                                                    <span>{format(new Date(employee.startDate), 'dd/MM/yyyy')}</span>
                                                </div>

                                            </Row>
                                        </Col>

                                        <Col lg={12} xs={24} span={12}>
                                            <Row>
                                                <div className="text-label-employee">
                                                    <strong>Employee level: </strong>
                                                    <span>{employee.employeeLevel}</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="text-label-employee">
                                                    <strong>Department: </strong>
                                                    <span>{employee.departmentName}</span>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                            <div className="table-detail">
                                <Row>
                                    <Col lg={24} xs={24} span={24}>
                                        <Tabs activeKey={activeTab} onChange={handleTabChange}>
                                            <TabPane tab="Absence history" key="1">
                                                <Table columns={columnsAbsence} />
                                            </TabPane>
                                            <TabPane tab="Violating history" key="2">
                                                <Table
                                                    columns={columnsViolating}
                                                    dataSource={checkInRecords}
                                                    scroll={{ x: RESPONSIVE_FOR_TABLE.x }}
                                                    pagination={pagination}
                                                    onChange={handleTableChange} />
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
};
export default EmployeeDetail;
