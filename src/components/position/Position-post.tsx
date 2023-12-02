import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { fetchPositions } from "../../services/position-service";
import { fetchDepartments, addDepartment } from "../../services/department-service";
import { Position } from "../../models/position";
import { Department } from "../../models/department";
interface Props {
  handleSubmit: (position: Position) => Promise<void>;
  departments: Department[]; 
}

const PositionPost = (props: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<Department[]>(props.departments || []);
  const [open, setOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formData, setFormData] = useState<Position>({
    name: "",
    departmentId: "",
  });
  useEffect(() => {
    fetchPositions().then((response) => {
      setPositions(response);

    });
    fetchDepartments().then((response) => {
      setDepartments(response);
    });
  }, []);

  const showModal = () => {
    setOpen(true);
    if (!dataLoaded) {
      fetchPositions().then((response) => {
        const data = response?.data;
        setPositions(data);
        setDataLoaded(true);
      });
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSave = () => {
    if (!formData.name) {
      message.error("Please enter a valid name.");
      return;
    }
    setConfirmLoading(true);
    props
      .handleSubmit(formData)
      .then(() => {
        setConfirmLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        setConfirmLoading(false);
        message.error("An error occurred while saving the position.");
      });
  };
  return (
    <>
      <Button className="btn-add" type="primary" onClick={showModal}>
        Add new
      </Button>
      <Modal
        title="Create New Position"
        visible={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
        >
          <Form.Item label="Name" name="name">
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Department" name="departmentId">
            <Select
              value={formData.departmentId}
              onChange={(value) => setFormData({ ...formData, departmentId: value })}
            >
              {departments && departments.map((department) => (
                <Select.Option key={department.id} value={department.id}>
                  {department.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PositionPost;
