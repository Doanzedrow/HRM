import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Input, Form, Row, Col, Upload, DatePicker, Cascader, Button } from 'antd';
import type { UploadProps } from 'antd';
import '../application/application.css';
import { Content } from 'antd/es/layout/layout';
import { fetchRecruitments } from '../../services/recruitment-service';
import { ToastContainer, toast } from "react-toastify";
import { Recruitment } from '../../models/recruitment';
import type { UploadFile } from 'antd/es/upload/interface';
import { addApplication } from '../../services/application_form-service';

import dayjs from 'dayjs';
import { Application } from '../../models/application_form';

const ApplicationForm = () => {
  const [form] = Form.useForm();
  const[application,setApplication]= useState<Application[]>([]);
  const onFinish = (values: any) => {
    addApplication(values);
    toast.success('Add position success!', {
      position: 'bottom-right',
    });
    console.log('Received values:', values);
    // đóng form khi nhấn submit
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // Chỉ cho phép một tệp
    newFileList = newFileList.slice(-1);

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    if (info.file.status === 'done') {
      addApplication(info.file.response); // Sử dụng dữ liệu từ phản hồi API để gọi hàm addApplication
    }
    setFileList(newFileList);
  };
  
  const beforeUpload = (file: File) => {
    // Kiểm tra trước và chỉ cho phép một tệp
    return fileList.length === 0;

  };
  // const props = {
  //   action: 'https://localhost:7287/api/ApplicationForm/add-application',
  //   onChange: handleChange,
  //   beforeUpload: beforeUpload,
  //   fileList: fileList,
  // };
  //kiem tra validate name
  const validateName = (rule: any, value: string) => {
    if (!value || value.trim() === '') {
      // Nếu giá trị trống, không hiển thị thông báo lỗi
      return Promise.reject('Please input full name');
    } else if (/\d/.test(value)) {
      // Nếu tên chứa số, trả về lỗi
      return Promise.reject('Name cannot contain numbers');
    } else {
      // Nếu tên hợp lệ, không hiển thị thông báo lỗi
      return Promise.resolve();
    }
  };
  const validateEmail = (rule: any, value: string) => {
    // Biểu thức chính quy kiểm tra email
    const emailRegex = new RegExp('^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$');

    if (!value || value.trim() === '') {
      // Nếu giá trị trống, không hiển thị thông báo lỗi
      return Promise.reject('Please input an email address');
    } else if (!emailRegex.test(value)) {
      // Nếu giá trị không khớp với biểu thức chính quy, trả về lỗi
      return Promise.reject('Invalid email address');
    } else {
      // Nếu email hợp lệ, không hiển thị thông báo lỗi
      return Promise.resolve();
    }
  };
  const validatePhoneNumber = (rule: any, value: string) => {
    // Biểu thức chính quy kiểm tra số điện thoại (10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;

    if (!value || value.trim() === '') {
      // Nếu giá trị trống, hiển thị thông báo lỗi
      return Promise.reject('Please input phone number');
    } else if (!phoneRegex.test(value)) {
      // Nếu giá trị không khớp với biểu thức chính quy, trả về lỗi
      return Promise.reject('Invalid phone number');
    } else {
      // Nếu số điện thoại hợp lệ, không hiển thị thông báo lỗi
      return Promise.resolve();
    }
  };
  const validateDayOfBirth = (rule: any, value: any) => {
    const dateOfBirth = dayjs(value);

    if (!dateOfBirth.isValid()) {
      return Promise.reject('Please input a valid date of birth');
    }
    console.log(value);

    // Chuyển ngày tháng thành chuỗi trước khi kiểm tra
    const dateOfBirthString = dateOfBirth.format('dd-MM-yyyy');

    if (!dateOfBirthString || dateOfBirthString.trim() === '') {
      return Promise.reject('Please input day of birth');
    } else {
      return Promise.resolve();
    }
  };
  const validateNationality = (rule: any, value: string) => {
    if (!value || value.trim() === '') {
      // Nếu giá trị trống,hiển thị thông báo lỗi
      return Promise.reject('Please input nationality');
    } else if (/\d/.test(value)) {
      // Nếu  chứa số, trả về lỗi
      return Promise.reject('Nationality cannot contain numbers');
    }
    else {
      // Nếu đã chọn, không hiển thị thông báo lỗi
      return Promise.resolve();
    }
  };
  const validateCV = (rule: any, value: any, callback: any) => {
    if (!value || value.length === 0) {
      // Nếu giá trị trống (không có tệp CV), gọi callback với thông báo lỗi
      callback('Please upload CV');
    } else {
      // Nếu có tệp CV, gọi callback mà không có thông báo lỗi
      callback();
    }
  };
  const validateRecruiment = (rule: any, value: string) => {
    if (!value || value.trim() === '') {
      // Nếu giá trị trống,hiển thị thông báo lỗi
      return Promise.reject('Please select recruiment');
    }
    else {
      // Nếu đã chọn, không hiển thị thông báo lỗi
      return Promise.resolve();
    }
  };
  const validateAddress = (rule: any, value: string) => {
    if (!value || value.trim() === '') {
      // Nếu giá trị trống,hiển thị thông báo lỗi
      return Promise.reject('Please input present address');
    }
    else {
      // Nếu đã chọn, không hiển thị thông báo lỗi
      return Promise.resolve();
    }
  };
  return (
    <>
      <Content style={{
        backgroundColor: "#f0f2f5",
        padding: "0 50px",
        minHeight: "100vh",
      }}>

        <div className='application-content' style={{
          padding: 24,
          minHeight: 380,
        }}>
          <h1 style={{ textAlign: 'center' }}>Application Form</h1>
          <Form onFinish={onFinish}
            form={form}>
            <Row>
              <Col span={12} className='col-left'>
                <div className='input-left'>
                  {/* input name */}
                  <label htmlFor="name">Fullname</label>
                  <Form.Item name='name' rules={[{ validator: validateName }]}>
                    <Input placeholder="Enter Fullname" />
                  </Form.Item>
                  {/* input email */}
                  <label htmlFor="email">Email</label>
                  <Form.Item name='email' rules={[{ validator: validateEmail }]}>
                    <Input placeholder="Enter Email" />
                  </Form.Item>
                  {/* input phone */}
                  <label htmlFor="Phone">Phone Number</label>
                  <Form.Item name='Phone' rules={[{ validator: validatePhoneNumber }]}>
                    <Input placeholder="Enter Phone" />
                  </Form.Item>
                  {/* option gender */}

                  <label htmlFor="Gender">Gender</label>
                  <Form.Item name="Gender" rules={[
                    {
                      validator: (rule, value) => {
                        if (!value || value.length === 0) {
                          return Promise.reject('Please choose gender');
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}>
                    <Cascader
                      placeholder='Select gender'
                      options={[
                        {
                          value: 'Male',
                          label: 'Male',
                        },
                        {
                          value: 'Female',
                          label: 'Female',
                        },
                        {
                          value: 'Other',
                          label: 'Other',
                        },
                      ]}
                    />
                  </Form.Item>
                  {/* select day of birth */}
                  <label htmlFor="dayOfBirth">Day of Birth</label>
                  <Form.Item name="dayOfBirth" rules={[{ validator: validateDayOfBirth }]}>
                    <DatePicker />
                  </Form.Item>

                  <Button>Cancel</Button>
                </div>
              </Col>


              <Col span={12} className='col-right'>
                <div className='input-right'>
                  <label htmlFor="addrees">Present Address</label>
                  <label htmlFor="addrees">Present Address</label>
                  <Form.Item name="address" rules={[{ validator: validateAddress }]}>
                    <Input placeholder="Enter Address" />
                  </Form.Item>


                  <label htmlFor="nationality">Nationality</label>
                  <label htmlFor="nationality">Nationality</label>
                  <Form.Item name="nationality" rules={[{ validator: validateNationality }]}>
                    <Input placeholder="Enter Nationality" />
                  </Form.Item>


                  <label htmlFor="expected">Expected Salary</label>
                  <Form.Item name='expected' rules={[/* Add your validation rules here */]}>
                    <Input placeholder="Enter Salary" />
                  </Form.Item>

                  <label htmlFor="recruiment">Recruiment</label>
                  <Form.Item name="recruiment" rules={[
                    {
                      validator: (rule, value) => {
                        if (!value || value.length === 0) {
                          return Promise.reject('Please choose recruiment');
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}>
                    <Cascader placeholder='Select Recruiment'
                      options={[
                        {
                          value: 'Full Stack Developer',
                          label: 'Full Stack Developer',
                        },
                        {
                          value: 'rewww',
                          label: 'esd',
                        },
                      ]}
                    />
                  </Form.Item>
                  <label htmlFor="upload"> Upload CV Here</label>
                  {/* rules={[{ validator: validateCV }]} */}
                  {/* <Form.Item >
                    <Upload {...props} name='upload' >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item> */}
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Content>
    </>
  )
}

export default ApplicationForm;
