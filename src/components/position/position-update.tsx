import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { fetchDepartments } from '../../services/department-service';
import { fetchPositions } from '../../services/position-service';
import { Department } from '../../models/department';
import { Position } from '../../models/position';

interface Props {
  handleUpdate: (id: string, position: Position) => Promise<void>;
  position: Position;
  departments?: Department[];
}

const PositionEdit: React.FC<Props> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<Department[]>(props.departments || []);
  const [open, setOpen] = useState(false);
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
    setFormData({
      name: props.position.name,
      departmentId: props.position.departmentId,
    });
  }, [props.position]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectDepartment = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      departmentId: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.departmentId) {
      message.error('Please input all data');
      return;
    }
    const id = props.position.id ?? "";
    await props.handleUpdate(id, formData);
    setOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Position"
        visible={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Name" name="name" initialValue={formData.name}>
            <Input
              name="name"
              onChange={handleInputPosition}
            />
          </Form.Item>
          <Form.Item label="Department" name="departmentId" initialValue={formData.departmentId}>
            <Select
              onChange={handleSelectDepartment}
              options={departments.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            >
              {departments.map((department) => (
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

export default PositionEdit;
