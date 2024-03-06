import React from 'react'
import Layout from "../component/Layout.js"
import { Col, Form, Input, Row, TimePicker, message } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from "../redux/feature/alertSlice.js"
import axios from "axios";
import { server } from "../index"
import moment from 'moment'

const ApplyDoctor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${server}/user/apply-doctor`, {
                ...values, userId: user._id, timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/")
            } else {
                message.error(res.data.message)
            }
        } catch (e) {
            console.log(e);
            dispatch(hideLoading());
            message.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <h1 className='text-center'>Apply Doctor</h1>
            <Form onFinish={handleFinish} layout='vertical' className='m-3'>
                <h5>Personal Details :</h5>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name:" name="firstName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your First Name" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name:" name="lastName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Last Name" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone Number:" name="phone" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Phone Number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email:" name="email" required rules={[{ required: true }]}>
                            <Input type="email" placeholder="Your Email" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website:" name="website">
                            <Input type="text" placeholder="Your Website" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address:" name="address" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Address" />
                        </Form.Item>
                    </Col>
                </Row>
                <h5 className=''>Professional Details :</h5>

                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization:" name="specialization" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Specialization" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience:" name="experience" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Experience" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Fees Per Consultation:" name="feesPerConsultation" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Fees Per Consultation" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings" required>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className='btn btn-primary form-btn' type='submit'>Submit</button>
                    </Col>

                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor