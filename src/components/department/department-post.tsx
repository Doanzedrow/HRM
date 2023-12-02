import { Input } from "antd";
import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { Department } from "../../models/department";
import { toast } from "react-toastify";
interface Props {
  handleSubmit: (department: Department) => Promise<void>;
}
const DepartmentPost = (props: Props) => {
  const initialState = {
    name: "",
  };
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [department, setDepartment] = useState(initialState);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }

    if (!department.name) {
      toast.error("Please fill all the details !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    props.handleSubmit(department);
    setOpen(false);
    setDepartment({ name: "" });
  };

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setDepartment({ ...department, [name]: value });
  }
  return (
    <>
      <Button className="btn-add" type="primary" onClick={showModal}>
        Add new
      </Button>
      <Modal
        style={{ textAlign: "center" }}
        title="Create New Department"
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
          <Form.Item label="Name" name="name">
            <Input name="name" onChange={handleInputChange} value={department.name} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default DepartmentPost;
