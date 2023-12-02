import { Button, Form, Input, Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { changePassword } from "../../services/auth-service";
import { ChangePasswordReq } from "../../models/auth";
import { AppContext } from "../../context/app-context";
interface Props {
  onClose: () => void;
  open: boolean;
}
const ChangePassword = (props: Props) => {
  const { employee } = useContext(AppContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(props.open);
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])(?!.*\s).{8,}$/g;
  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    applicationUserId: employee?.userId,
  };
  const [password, setPassword] = useState(initialState);

  const handleSubmit = async (event: any) => {
    debugger;
    event.preventDefault();
    if (
      !password.confirmPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      message.error("Please input all data");
      return;
    }
    try {
      const result = await changePassword(password);
      if (result != null) {
        setOpen(false);
        props.onClose();
        message.success("Change password success !");
      }
    } catch (error) {
      throw error;
    }
  };
  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  }
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <>
      <Modal
        style={{ textAlign: "center" }}
        title="Change password"
        confirmLoading={confirmLoading}
        width={800}
        open={open}
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
          <Form.Item
            label="Current password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input current password!",
              },
            ]}
          >
            <Input.Password
              name="currentPassword"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your Password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || regexPassword.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Please input the correct password format!"
                  );
                },
              }),
              {
                validator: async (_, value) => {
                  if (value && (value.length < 8 || value.length > 255)) {
                    return Promise.reject(
                      "Requires a password of at least 8 characters, at least 1 uppercase letter and at least 1 lowercase letter, at least 1 number, at least 1 special character"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password name="newPassword" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "New password and confirm password are incorrect"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              name="confirmPassword"
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ChangePassword;
