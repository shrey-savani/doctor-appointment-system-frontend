import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {  useDispatch } from 'react-redux'
import { showLoading, hideLoading } from "../redux/feature/alertSlice"
import "../styles/RegisterStyle.css"
import axios from "axios";
import { server } from "../index"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post(`${server}/user/login`, values);
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("User LoggedIn");
        navigate('/');
      }

      if (!res.data.success) {
        message.error(res.data.message);
      }
      
    } catch (e) {
      dispatch(hideLoading())
      message.error("Something went wrong");
    }
  };
  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className='register-form'>
        <h2 className='text-center'>Login Form</h2>
        <Form.Item label="Email:" name="email" required rules={[{ required: true }]}>
          <Input type="email" placeholder='Enter Email'/>
        </Form.Item>
        <Form.Item label="Password:" name="password" required rules={[{ required: true }]}>
          <Input type="password" placeholder='Enter Password'/>
        </Form.Item>
        <Link to="/register" className='me-2 '>Not A User, Register Here</Link>
        <button className='btn btn-primary' type='submit'>Sign In</button>
      </Form>
    </div>)
}

export default Login