import { App, Input, Select, message } from "antd";
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

interface Props {
  handleUpdate: (id: string, recruitment: Recruitment) => Promise<void>;
  recruitment: Recruitment;
}
const RecruitmentEdit = (props: Props) => {
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(props.recruitment);
  const regexNumber = /[^0-9]+$/g;
  const showModal = () => {
    setOpen(true);
    fetchPositions().then((response) => {
      setPositions(response);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const id = props.recruitment.id ?? "";
    props.handleUpdate(id, formData);
    setOpen(false);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSelectPosition(value: string) {
    const selectedPosition = positions.find((item) => item.id === value);
    setFormData((prevData) => ({
      ...prevData,
      positionId: value,
      positionName: selectedPosition ? selectedPosition.name : "",
    }));
  }

  const handleCategoryChange = (value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setFormData((prevData) => ({
      ...prevData,
      jobDescription: data,
    }));
  };
  return (
    <>
      <Button type="default" onClick={showModal}>
        Edit
      </Button>

      <Modal
        style={{ textAlign: "center" }}
        title="Edit Recruitment"
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Employee category"
            name="category"
            rules={[
              { required: true, message: "Please choose employee category" },
            ]}
            valuePropName="category"
          >
            <Select
              placeholder="Please select Employment category"
              onChange={handleCategoryChange}
              value={formData.category}
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
            rules={[{ required: true, message: "Please choose position" }]}
            valuePropName="positionId"
          >
            <Select
              value={formData.positionName}
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
            rules={[
              {
                required: true,
                message: "Please input Salary min!",
              },
            ]}
            valuePropName="salaryMin"
          >
            <Input
              type="number"
              onChange={handleInputChange}
              name="salaryMin"
              addonAfter="VNĐ"
              value={formData.salaryMin}
            />
          </Form.Item>

          <Form.Item
            label="Salary max"
            rules={[
              {
                required: true,
                message: "Please input Salary max!",
              },
            ]}
            valuePropName="salaryMax"
          >
            <Input
              type="number"
              onChange={handleInputChange}
              name="salaryMax"
              addonAfter="VNĐ"
              value={formData.salaryMax}
            />
          </Form.Item>

          <Form.Item
            label="Job description"
            name="jobDescription"
            valuePropName="jobDescription"
            initialValue={formData.jobDescription}
          >
            <CKEditor
              data={props.recruitment.jobDescription}
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
export default RecruitmentEdit;
