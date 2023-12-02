import {
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  message,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import "./absence.css";
import FormItem from "antd/es/form/FormItem";
import {
  Absence,
  AbsenceShiftTypeLabel,
  LeaveType,
  LeaveTypeLabel,
  ShiftType,
} from "../../models/absence";
import { AppContext } from "../../context/app-context";
import dayjs, { Dayjs } from "dayjs";
interface Props {
  handleSubmit: (absence: Absence) => Promise<void>;
}
const AbsencePost = (props: Props) => {
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(1);
  const { employee } = useContext(AppContext);
  const [fromDate, setFromDate] = useState<null | Dayjs>(null);
  const [toDate, setToDate] = useState<null | Dayjs>(null);
  const [visibleFromDate, setVisibleFromDate] = useState<boolean>(false);
  const initialState = {
    leaveType: 0,
    type: 1,
    fromDateSingle: "",
    shiftTypeSingle: null,
    fromDateMulti: "",
    shiftTypeFromDateMulti: null,
    toDateMulti: "",
    shiftTypeToDateMulti: null,
    reason: "",
    applicationUserId: "",
    hourDeducted: 0,
  };
  const [absence, setAbsence] = useState(initialState);

  const showModal = () => {
    setOpen(true);
    setVisibleFromDate(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (absence.type === 1) {
      if (
        absence.leaveType === null ||
        absence.fromDateSingle === null ||
        absence.shiftTypeSingle === null
      ) {
        message.error("Please input all data");
        return;
      }
      props.handleSubmit(absence);
      setOpen(false);
    } else if (absence.type === 2) {
      if (
        absence.leaveType === null ||
        absence.fromDateMulti === null ||
        absence.shiftTypeFromDateMulti === null ||
        absence.toDateMulti === null ||
        absence.shiftTypeToDateMulti === null
      ) {
        message.error("Please input all data");
        return;
      }
      props.handleSubmit(absence);
      setOpen(false);
    }
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setType(e.target.value);
    setAbsence({ ...absence, type: e.target.value });
  };

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setAbsence({ ...absence, [name]: value });
  }

  const handleSelectChangeLeaveType = (value: number) => {
    setAbsence({ ...absence, leaveType: value });
  };

  const handleSelectChangeShiftType = (value: number, name: string) => {
    setAbsence({ ...absence, [name]: value });
  };

  const onChange = (date: Dayjs | null, dateString: string, name: string) => {
    if (name === "fromDateMulti") {
      setFromDate(date);
      setVisibleFromDate(false);
    }
    setAbsence({ ...absence, [name]: dateString });
  };

  const isSunday = (date: Dayjs) => {
    return date.day() === 0;
  };

  const disabledDate: any = (current: Dayjs | null) => {
    if (fromDate) {
      const nextDay = fromDate.add(1, "day");
      return (
        (current && current <= nextDay.startOf("day")) ||
        (current && isSunday(current))
      );
    }
    return false;
  };

  const disabledSunday: any = (current: Dayjs | null) => {
    if (current) {
      if (current.day() === 0) {
        return true;
      }
      return false;
    }
  };

  const DayCountView = () => {
    if (type === 1) {
      return (
        <>
          <Row>
            <Col span={12}>
              <Form.Item
                className="w-full"
                label="From date"
                name="fromDateSingle"
                rules={[
                  {
                    required: true,
                    message: "Please select from date",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  inputReadOnly
                  disabledDate={disabledSunday}
                  onChange={(date, dateString) =>
                    onChange(date, dateString, "fromDateSingle")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Shift type"
                className="w-full"
                name="shiftTypeSingle"
                rules={[
                  {
                    required: true,
                    message: "Please select shift type",
                  },
                ]}
              >
                <Select
                  placeholder="Please select shift type"
                  onChange={(value) =>
                    handleSelectChangeShiftType(value, "shiftTypeSingle")
                  }
                >
                  {Object.values(ShiftType).map((e) => {
                    const value = Number(e);
                    if (Number.isInteger(value)) {
                      return (
                        <Option key={value} value={value}>
                          {AbsenceShiftTypeLabel.get(value)}
                        </Option>
                      );
                    }
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      );
    }
    return (
      <>
        <Row>
          <Col span={12}>
            <Form.Item
              label="From date"
              className="w-full"
              name="fromDateMulti"
            >
              <DatePicker
                className="w-full"
                onChange={(date, dateString) =>
                  onChange(date, dateString, "fromDateMulti")
                }
                inputReadOnly
                disabledDate={disabledSunday}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Shift type"
              name="shiftTypeFromDateMulti"
              className="w-full"
            >
              <Select
                placeholder="Please select shift type"
                onChange={(value) =>
                  handleSelectChangeShiftType(value, "shiftTypeFromDateMulti")
                }
              >
                {Object.values(ShiftType).map((e) => {
                  const value = Number(e);
                  if (Number.isInteger(value)) {
                    return (
                      <Option key={value} value={value}>
                        {AbsenceShiftTypeLabel.get(value)}
                      </Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="To date" className="w-full" name="toDateMulti">
              <DatePicker
                disabled={visibleFromDate}
                className="w-full"
                onChange={(date, dateString) =>
                  onChange(date, dateString, "toDateMulti")
                }
                disabledDate={disabledDate}
                inputReadOnly
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Shift type"
              className="w-full"
              name="shiftTypeToDateMulti"
            >
              <Select
                className="w-full"
                placeholder="Please select shift type"
                onChange={(value) =>
                  handleSelectChangeShiftType(value, "shiftTypeToDateMulti")
                }
              >
                {Object.values(ShiftType).map((e) => {
                  const value = Number(e);
                  if (Number.isInteger(value)) {
                    return (
                      <Option key={value} value={value}>
                        {AbsenceShiftTypeLabel.get(value)}
                      </Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Booking absence
      </Button>
      <Modal
        style={{ textAlign: "center" }}
        title="Booking absence"
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
          <Row>
            <Col span={12}>
              <Form.Item label="Employee" className="w-full">
                {employee?.fullName}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="w-full"
                label="Leave type"
                rules={[
                  { required: true, message: "Please choose leave type" },
                ]}
              >
                <Select
                  className="w-full"
                  placeholder="Please select leave type"
                  onChange={handleSelectChangeLeaveType}
                >
                  {Object.values(LeaveType).map((e) => {
                    const value = Number(e);
                    if (Number.isInteger(value)) {
                      return (
                        <Option key={value} value={value}>
                          {LeaveTypeLabel.get(value)}
                        </Option>
                      );
                    }
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem className="w-full" label="Type">
                <Radio.Group
                  onChange={onChangeRadio}
                  value={type}
                  className="w-full"
                >
                  <Radio value={1}>Single</Radio>
                  <Radio value={2}>Multiple</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <DayCountView />
          <Row>
            <Col span={12}>
              <Form.Item className="w-full" label="Reason">
                <Input.TextArea
                  className="w-full"
                  onChange={handleInputChange}
                  name="reason"
                ></Input.TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default AbsencePost;
