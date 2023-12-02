import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, message } from "antd";
import App from "../../App";
import { Content } from "antd/es/layout/layout";
import { ToastContainer } from "react-toastify";
import "../Home/checkIn.css"
import { checkIn, checkOut, getCheckInTimeByDate, goIn, goOut } from '../../services/check-in-record-service';
import { AppContext } from "../../context/app-context";
const Home: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warnMessage, setWarnMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isButtonCheckInEnabled, setButtonCheckInEnabled] = useState(true);
  const [isButtonCheckOutEnabled, setButtonCheckOutEnabled] = useState(true);
  const [isButtonGoOutEnabled, setButtonGoOutEnabled] = useState(true);
  const [isButtonGoInEnabled, setButtonGoInEnabled] = useState(true);
  const { employee } = useContext(AppContext);
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
  };
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const date = today.toLocaleString('en-US', optionsDate);
  useEffect(() => {
    if (errorMessage) {
      console.log("error rồi đây", errorMessage);
      message.error(errorMessage);
    }
  }, [errorMessage]);
  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    if (warnMessage) {
      message.warning(warnMessage);
    }
  }, [warnMessage]);
  useEffect(() => {
    if (employee != null) {
      getCheckInTimeByDate(setWarnMessage, date, employee?.userId)
        .then((response) => {
          if (response != null) {
            if (response.checkInTime != null) {
              setButtonCheckInEnabled(true);
              setButtonCheckOutEnabled(false);
              setButtonGoOutEnabled(false);
            }
            if (response.goOutTime != null) {
              setButtonGoOutEnabled(true);
              setButtonCheckOutEnabled(true);
              setButtonGoInEnabled(false);
            }
            if (response.goInTime != null) {
              setButtonGoOutEnabled(false);
              setButtonGoInEnabled(true);
              setButtonCheckOutEnabled(false);
            }
            if (response.checkOutTime != null) {
              setButtonCheckOutEnabled(true);
              setButtonCheckInEnabled(true);
              setButtonGoInEnabled(true);
              setButtonGoOutEnabled(true);
            }
          } else {
            setButtonCheckInEnabled(false);
          }
        })

    }
  }, [employee, date]);

  const handleCheckIn = async () => {
    const checkInReq = {
      date: today.toLocaleString('en-US', optionsDate),
      checkInTime: today.toLocaleString('en-US', options),
      employeeId: employee?.userId,
    };
    try {
      console.log(employee);
      await checkIn(checkInReq, setErrorMessage, setSuccessMessage);
      setButtonCheckInEnabled(true);
      setButtonCheckOutEnabled(false);
      setButtonGoOutEnabled(false);
    } catch (error) { }
  }

  const handleCheckOut = async () => {
    const checkInReq = {
      date: today.toLocaleString('en-US', optionsDate),
      checkOutTime: today.toLocaleString('en-US', options),
      employeeId: employee?.userId,
    };
    try {
      await checkOut(checkInReq, setErrorMessage, setSuccessMessage);
      setButtonCheckOutEnabled(true);
      setButtonCheckInEnabled(true);
      setButtonGoInEnabled(true);
      setButtonGoOutEnabled(true);
    } catch (error) { }

  }
  const handleGoOut = async () => {
    const checkInReq = {
      date: today.toLocaleString('en-US', optionsDate),
      goOutTime: today.toLocaleString('en-US', options),
      employeeId: employee?.userId,
    };
    try {
      await goOut(checkInReq, setErrorMessage, setSuccessMessage);
      setButtonGoOutEnabled(true);
      setButtonGoInEnabled(false);
    } catch (error) { }

  }

  const handleGoIn = async () => {
    const checkInReq = {
      date: today.toLocaleString('en-US', optionsDate),
      goInTime: today.toLocaleString('en-US', options),
      employeeId: employee?.userId,
    };
    try {
      await goIn(checkInReq, setErrorMessage, setSuccessMessage);
      setButtonGoOutEnabled(false);
      setButtonGoInEnabled(true);
    } catch (error) { }

  }

  return (
    <>
      <App />
      <Content
        className="site-layout"
      >
        <div
        >
          <div className="clock-time">
            <div className="container">
              <div className="clock">
                <span id='hours'>{hours}</span>
                <span>:</span>
                <span id='minutes'>{minutes}</span>
                <span>:</span>
                <span id='seconds'>{seconds}</span>
              </div>
            </div>
            <div className="button-action">
              <Row gutter={16} style={{ marginBottom: "50px" }}>
                <Col lg={12} xs={24} span={12}>
                  <Row justify="center">
                    <button style={{ backgroundColor: isButtonCheckInEnabled ? '#ccc' : '#419aff', color: '#fff' }}
                      className='check-in' onClick={handleCheckIn} disabled={isButtonCheckInEnabled}>Check in</button>
                  </Row>

                </Col>

                <Col lg={12} xs={24} span={12}>
                  <Row justify="center">
                    <button style={{ backgroundColor: isButtonCheckOutEnabled ? '#ccc' : '#419aff', color: '#fff' }}
                      className='check-out' onClick={handleCheckOut} disabled={isButtonCheckOutEnabled}>Check out</button>
                  </Row>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col lg={12} xs={24} span={12}>
                  <Row justify="center">
                    <button style={{ backgroundColor: isButtonGoOutEnabled ? '#ccc' : '#419aff', color: '#fff' }}
                      className='go-out' onClick={handleGoOut} disabled={isButtonGoOutEnabled}>Go out</button>
                  </Row>

                </Col>

                <Col lg={12} xs={24} span={12}>
                  <Row justify="center">
                    <button style={{ backgroundColor: isButtonGoInEnabled ? '#ccc' : '#419aff', color: '#fff' }}
                      className='go-in' onClick={handleGoIn} disabled={isButtonGoInEnabled}>Go in</button>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>

          <ToastContainer position="bottom-right" />
        </div>
      </Content>
      <ToastContainer position="bottom-right" />
    </>
  );
};
export default Home;
