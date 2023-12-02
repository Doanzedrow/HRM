import { Input, Select, message } from "antd";
import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { Recruitment } from "../../models/recruitment";
import {
  EmployeeCategory,
  EmploymentCategoryLabel,
} from "../../models/employee";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Position } from "../../models/position";
import { fetchPositions } from "../../services/position-service";
import "./recruitment.css";

interface Props {
  handleSubmit: (recruitment: Recruitment) => Promise<void>;
}
const RecruitmentPost = (props: Props) => {
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const initialState = {
    positionId: "",
    salaryMin: 0,
    salaryMax: 0,
    category: null,
    applicationUserId: "",
    jobDescription: "",
  };
  const regexNumber = /[^0-9]+$/g;
  const [recruitment, setRecruitment] = useState(initialState);

  const showModal = () => {
    setOpen(true);
    fetchPositions().then((response) => {
      setPositions(response);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      !recruitment.salaryMin ||
      !recruitment.salaryMax ||
      recruitment.category === null ||
      recruitment.positionId === ""
    ) {
      message.error("Please input all data");
      return;
    }
    props.handleSubmit(recruitment);
    form.resetFields();
    setOpen(false);
  };

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setRecruitment({ ...recruitment, [name]: value });
  }

  function handleSelectPosition(value: string) {
    setRecruitment({ ...recruitment, positionId: value });
  }

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setRecruitment({ ...recruitment, jobDescription: data });
  };

  const handleCategoryChange = (value: number, name: string) => {
    setRecruitment({ ...recruitment, [name]: value });
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new
      </Button>
      <Modal
        style={{ textAlign: "center" }}
        title="Create New Recruitment"
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Employee category"
            name="employeeCategory"
            rules={[
              { required: true, message: "Please choose employee category" },
            ]}
          >
            <Select
              placeholder="Please select employment category"
              onChange={(value) => handleCategoryChange(value, "category")}
            >
              {Object.values(EmployeeCategory).map((e) => {
                const value = Number(e);
                if (Number.isInteger(value)) {
                  return (
                    <Option key={value} value={value}>
                      {EmploymentCategoryLabel.get(value)}
                    </Option>
                  );
                }
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Position"
            name="positionId"
            rules={[{ required: true, message: "Please choose position" }]}
          >
            <Select
              placeholder="Please select position"
              style={{ width: "100%" }}
              onChange={handleSelectPosition}
              options={positions.map((item) => ({
                name: "positionId",
                value: item.id,
                label: item.name,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Salary min"
            name="salaryMin"
            rules={[
              { required: true, message: "Please input salary min!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && regexNumber.test(value)) {
                    return Promise.reject("Please input number only!");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              onChange={handleInputChange}
              name="salaryMin"
              addonAfter="VNĐ"
            />
          </Form.Item>
          <Form.Item
            label="Salary max"
            name="salaryMax"
            rules={[
              { required: true, message: "Please input salary max!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && regexNumber.test(value)) {
                    return Promise.reject("Please input number only!");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              onChange={handleInputChange}
              name="salaryMax"
              addonAfter="VNĐ"
            />
          </Form.Item>
          <Form.Item label="Job description" name="jobDescription">
            <CKEditor
              editor={ClassicEditor}
              onReady={(editor) => {}}
              onChange={handleEditorChange}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default RecruitmentPost;
