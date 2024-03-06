import React from 'react';
import { Form, Input, message } from 'antd';
import '../styles/RegisterStyle.css';
import { Link, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/feature/alertSlice"
import { useDispatch } from 'react-redux'
import axios from "axios";
import { server } from '../index';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const { name, email, password } = values;
            const res = await axios.post(`${server}/user/register`, { name, email, password });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success("User Registered Successfully");
                navigate('/login');
            } else {
                message.error(res.data.message);
            }
        } catch (e) {
            dispatch(hideLoading());
            message.error("Something went wrong");
        }
    };
    return (
        <>
            <div className="form-container">
                <Form layout="vertical" onFinish={onFinishHandler} className='register-form'>
                    <h2 className='text-center'>Register Form</h2>
                    <Form.Item label="Name:" name="name">
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Email:" name="email">
                        <Input type="email" required />
                    </Form.Item>
                    <Form.Item label="Password:" name="password">
                        <Input type="password" required />
                    </Form.Item>
                    <Link to="/login" className='me-2 '>Already user login here</Link>
                    <button className='btn btn-primary' type='submit'>Sign up</button>
                </Form>
            </div>
        </>
    )
}

export default Register