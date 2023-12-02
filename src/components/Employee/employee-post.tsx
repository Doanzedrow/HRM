import { Input, Select } from "antd";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, DatePicker, Row, Col, message } from "antd";
import { Employee } from '../../models/employee';
import "./employee.css";
import { fetchPositions } from "../../services/position-service";
import { Position } from "../../models/position";
import NoImage from "../../assets/images/no_image.jpg";

import {
    EmployeeCategory,
    Gender,
    EmployeeLevel,
    EmploymentCategoryLabel,
    GenderLabel,
    EmploymentLevelLabel,
    RoleLabel,
    Role,
} from "../../models/employee";
import dayjs from "dayjs";
interface Props {
    handleSubmit: (employee: Employee) => Promise<void>;
}
const EmployeePost = (props: Props) => {
    const initialState = {
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
        formFile: undefined as File | undefined,
        role: 0
    };
    const regexNumber = /[^0-9]+$/g;
    const regexNumberPhone = /^(84|0[3|5|7|8|9])([0-9]{8})$/g;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])(?!.*\s).{8,}$/g;
    const regexchar = /^[a-zA-Z0-9\s\u00C0-\u1EF9]+$/g;
    const regexAddress = /^[a-zA-Z0-9\s\u00C0-\u1EF9,/]+$/g;
    const [formKey, setFormKey] = useState(0);
    const { Option } = Select;
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [employee, setEmployee] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [positions, setPositions] = useState<Position[]>([]);
    const [isDatePickerOpenDob, setDatePickerOpenDob] = useState(false);
    const [isDatePickerOpenStd, setDatePickerOpenStd] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState(NoImage);

    const handleButtonClick = () => {
        const fileInput = document.getElementById('avatar') as HTMLInputElement | null;

        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        }
        else {
            setImageSrc(NoImage);
        }
        setSelectedFile(file || null);
        setEmployee({ ...employee, formFile: file })
    };

    const showModal = () => {
        setConfirmLoading(true);
        setOpen(true);
        fetchPositions().then((response) => {
            setPositions(response);
            setConfirmLoading(false);
        });
    };
    const handleCancel = () => {
        setOpen(false);
        setConfirmLoading(false);
    };
    const handleSubmitModal = async (e: any) => {
        e.preventDefault();
        if (!employee.fullName || !employee.address || !employee.salary
            || !employee.placeOfBirth || !employee.bankAccount || !employee.bankName || !employee.userName || !employee.passWord || !employee.email) {
            message.error("Please fill all the details !");
            return;
        }
        try {
            setConfirmLoading(true);
            await props.handleSubmit(employee);
            form.resetFields();
            setEmployee(initialState);
            setSelectedFile(null);
            setImageSrc(NoImage);
            setOpen(false);
            setFormKey(prevKey => prevKey + 1)
        } catch (error) {

            console.error("An error occurred:", error);
        } finally {
            setConfirmLoading(false);
        }

    };
    const disabledDate = (current: any) => {
        return current && current > dayjs().endOf('day');
    };

    function handleInputChange(event: any) {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    }

    function handleSelectPosition(value: string) {
        setEmployee({ ...employee, positionId: value });
    }
    function handleSelectGender(value: number) {
        setEmployee({ ...employee, gender: value });
    }

    function handleSelectEmploymentCategory(value: number) {
        setEmployee({ ...employee, employmentCategory: value });
    }
    function handleSelectEmployeeLevel(value: number) {
        setEmployee({ ...employee, employeeLevel: value });
    }
    function handleSelectRole(value: number) {
        setEmployee({ ...employee, role: value });
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add new
            </Button>
            <Modal
                title="Create New Employee"
                open={open}
                confirmLoading={confirmLoading}
                onOk={handleSubmitModal}
                onCancel={handleCancel}
                width={1000}
            >
                <Form
                    key={formKey}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 1000 }}
                    onFinish={handleSubmitModal}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Full name"
                                name="fullName"
                                rules={[
                                    { required: true, message: "Please input your full name!" },
                                    {
                                        validator: async (_, value) => {
                                            if (value && !regexchar.test(value)) {
                                                return Promise.reject("Please do not input special characters!");
                                            }
                                            else if (value && (value.length < 3 || value.length > 255)) {
                                                return Promise.reject("Full name must be at least 3 digits and most 255 digits.");
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}

                            >
                                <Input name="fullName" placeholder="Fullname" onChange={handleInputChange} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your email!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || regexEmail.test(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Please input the Correct email format!");
                                        },
                                    }),
                                ]}
                            >
                                <Input placeholder="Email" onChange={handleInputChange} name="email" />
                            </Form.Item>

                            <Form.Item
                                label="Phone number"
                                name="phoneNumber"
                                rules={[
                                    { required: true, message: "Please input your phone number!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value && !regexNumberPhone.test(value)) {
                                                return Promise.reject("Please input numbers only, correct format and least 10 digits!");
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}

                            >
                                <Input name="phoneNumber" placeholder="Phone number" style={{ width: '100%' }} maxLength={11} onChange={handleInputChange} />
                            </Form.Item>

                            <Form.Item
                                label="Adress"
                                name="address"
                                rules={[{ required: true, message: "Please input your adress!" },
                                {
                                    validator: async (_, value) => {

                                        if (value && !regexAddress.test(value)) {
                                            return Promise.reject("Please do not input special characters!");
                                        }
                                        else if (value && (value.length < 3 || value.length > 255)) {
                                            return Promise.reject("Adress must be at least 3 digits and most 255 digits.");
                                        }
                                        return Promise.resolve();
                                    },
                                },
                                ]}

                            >
                                <Input placeholder="Adress" onChange={handleInputChange} name="address" />
                            </Form.Item>

                            <Form.Item label="Gender" name="gender">
                                <Select placeholder="Please select gender" onChange={handleSelectGender}>
                                    {Object.values(Gender).map((e) => {
                                        const value = Number(e);
                                        if (Number.isInteger(value)) {
                                            return (
                                                <Option key={value} value={value}>
                                                    {GenderLabel.get(value)}
                                                </Option>
                                            );
                                        }
                                        return null;
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Date of birth" name="dob"
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                    }}
                                >
                                    <DatePicker format="DD/MM/YYYY" name="dob" open={isDatePickerOpenDob} onOpenChange={(status) => setDatePickerOpenDob(status)}
                                        allowClear={false}
                                        style={{ width: '100%' }}
                                        disabledDate={disabledDate} />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setDatePickerOpenDob(true)}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Place of birth"
                                name="placeOfBirth"
                                rules={[{ required: true, message: "Please input your Place of birth!" },
                                {
                                    validator: async (_, value) => {

                                        if (value && !regexAddress.test(value)) {
                                            return Promise.reject("Please do not input special characters!");
                                        }
                                        else if (value && (value.length < 3 || value.length > 255)) {
                                            return Promise.reject("Place of birth must be at least 3 digits and most 255 digits.");
                                        }
                                        return Promise.resolve();
                                    },
                                },
                                ]}

                            >
                                <Input placeholder="Place of birth" onChange={handleInputChange} name="placeOfBirth" />
                            </Form.Item>

                            <Form.Item
                                label="Bank account"
                                name="bankAccount"
                                rules={[
                                    { required: true, message: "Please input your bank account!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value && regexNumber.test(value)) {
                                                return Promise.reject("Please input number only!");
                                            }
                                            else if (value && (value.toString().length < 9 || value.toString().length > 14)) {
                                                return Promise.reject("Bank account must be at least 9 digits and most 14 digits.");
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}

                            >
                                <Input placeholder="Bank account" onChange={handleInputChange} minLength={9} maxLength={14} name="bankAccount" />
                            </Form.Item>

                            <Form.Item
                                label="Bank name"
                                name="bankName"
                                rules={[{ required: true, message: "Please input your Bank name!" },
                                {
                                    validator: async (_, value) => {
                                        if (value && !regexchar.test(value)) {
                                            return Promise.reject("Please do not enter special characters!");
                                        }
                                        else
                                            if (value && (value.length < 3 || value.length > 255)) {
                                                return Promise.reject("Bank name must be at least 3 digits and most 255 digits.");
                                            }
                                        return Promise.resolve();
                                    },
                                },]}

                            >
                                <Input placeholder="Bank name" onChange={handleInputChange} name="bankName" />
                            </Form.Item>

                            <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please input your role!" }]}>
                                <Select placeholder="Please select role" onChange={handleSelectRole}>
                                    {Object.values(Role).map((e) => {
                                        const value = Number(e);
                                        if (Number.isInteger(value)) {
                                            return (
                                                <Option key={value} value={value}>
                                                    {RoleLabel.get(value)}
                                                </Option>
                                            );
                                        }
                                        return null;
                                    })}
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col span={12}>


                            <Form.Item label="Start date" name="startDate">
                                <div
                                    style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                    }}
                                >
                                    <DatePicker format="DD/MM/YYYY" name="startDate" open={isDatePickerOpenStd} onOpenChange={(status) => setDatePickerOpenStd(status)}
                                        allowClear={false}
                                        style={{ width: '100%' }} />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setDatePickerOpenStd(true)}
                                    />
                                </div>
                            </Form.Item>



                            <Form.Item label="Employee category" name="employmentCategory">
                                <Select placeholder="Please select Employee category" onChange={handleSelectEmploymentCategory}>
                                    {Object.values(EmployeeCategory).map((e) => {
                                        const value = Number(e);
                                        if (Number.isInteger(value)) {
                                            return (
                                                <Option key={value} value={value}>
                                                    {EmploymentCategoryLabel.get(value)}
                                                </Option>
                                            );
                                        }
                                        return null;
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Position" name="positionId">
                                <Select
                                    placeholder="Please select position"
                                    style={{ width: "100%" }}
                                    onChange={handleSelectPosition}
                                    options={positions ? positions.map((item) => ({
                                        value: item.id,
                                        label: item.name,
                                    })) : []}
                                ></Select>
                            </Form.Item>

                            <Form.Item label="Employee level" name="employeeLevel">
                                <Select placeholder="Please select Employee level" onChange={handleSelectEmployeeLevel}>
                                    {Object.values(EmployeeLevel).map((e) => {
                                        const value = Number(e);
                                        if (Number.isInteger(value)) {
                                            return (
                                                <Option key={value} value={value} >
                                                    {EmploymentLevelLabel.get(value)}
                                                </Option>
                                            );
                                        }
                                        return null;
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Salary"
                                name="salary"
                                rules={[
                                    { required: true, message: "Please input your Salary!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value && regexNumber.test(value)) {
                                                return Promise.reject("Please input number only!");
                                            }
                                            else if (value && (value.toString().length > 15)) {
                                                return Promise.reject("Salary must be at most 15 digits.");
                                            }
                                            return Promise.resolve();

                                        },
                                    }),

                                ]}

                            >
                                <Input placeholder="Salary" style={{ width: '100%' }} onChange={handleInputChange} name="salary" />
                            </Form.Item>

                            <Form.Item
                                label="User name"
                                name="userName"
                                rules={[{ required: true, message: "Please input your User name!" },
                                {
                                    validator: async (_, value) => {
                                        if (value && !regexchar.test(value)) {
                                            return Promise.reject("Please input digits or numbers only!");
                                        }
                                        else if (value && (value.length < 5 || value.length > 255)) {
                                            return Promise.reject("User name must be at least 5 digits and most 255 digits.");
                                        }
                                        return Promise.resolve();
                                    },
                                },
                                ]}

                            >
                                <Input placeholder="User name" onChange={handleInputChange} name="userName" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="passWord"
                                rules={[{ required: true, message: "Please input your Password!" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || regexPassword.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Please input the correct password format!");
                                    },
                                }),
                                {
                                    validator: async (_, value) => {
                                        if (value && (value.length < 8 || value.length > 255)) {
                                            return Promise.reject("Password must be at least 8 digits and most 255 digits.");
                                        }
                                        return Promise.resolve();
                                    },
                                },
                                ]}

                            >
                                <Input.Password placeholder="Password" onChange={handleInputChange} name="passWord" autoComplete="new-password" />
                            </Form.Item>

                            <Form.Item
                                label="Avatar"
                                name="avatar"
                            >
                                <label htmlFor="avatar">
                                    <Button onClick={handleButtonClick}>Chọn ảnh</Button>
                                </label>
                                <Input type="file" id="avatar" placeholder="Avatar" accept="image/*" onChange={handleFileChange} name="avatar" style={{ display: 'none' }} />
                                <br />
                                <img className="avatar-img" src={imageSrc} alt="Preview" style={{ marginTop: '35px' }} />
                                <p>{selectedFile !== null ? selectedFile?.name : "Không có file nào được chọn"}</p>
                            </Form.Item>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default EmployeePost;
