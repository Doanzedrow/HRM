import { Input } from "antd";
import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { Department } from "../../models/department";
import { toast } from "react-toastify";
interface Props {
  handleUpdate: (id: string, department: Department) => Promise<void>;
  department: Department;
}
const DepartmentUpdate = (props: Props) => {
  const initialState = {
    name: "",
  };
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [department, setDepartment] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState(props.department);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    if (!field.name) {
      toast.error("Please fill all the details !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    const id = props.department.id ?? "";
    props.handleUpdate(id, field);
    setOpen(false);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setField((department) => ({
      ...department,
      [name]: value,
    }));
  }
  return (
    <>
      <Button style={{ float: "right" }} type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        style={{ textAlign: "center" }}
        title="Update Department"
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Name" valuePropName="name">
            <Input
              name="name"
              value={field.name}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default DepartmentUpdate;
