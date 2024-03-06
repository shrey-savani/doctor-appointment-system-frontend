import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { Col, Form, Input, Row, TimePicker, message } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { server } from '../../index'
import { useNavigate, useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../redux/feature/alertSlice'
import moment from 'moment'

const Profile = () => {
    const { user } = useSelector(state => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const doctorInfo = async () => {
            try {
                const res = await axios.post(`${server}/doctor/getSingleDoctorInfo`, { userId: params.id }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.success) {
                    setDoctor(res.data.data);
                }
            } catch (e) {
                console.log('error', e)
            }
        }
        doctorInfo();
    }, [])

    const handleUpdateFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${server}/doctor/updateDoctorInfo`, {
                ...values, userId: user._id, timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

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
            <h1>Manage Profile</h1>
            {doctor && (<Form onFinish={handleUpdateFinish} layout='vertical' className='m-3' initialValues={{
                ...doctor, timings: [
                    moment(doctor.timings[0], "HH:mm"),
                    moment(doctor.timings[1], "HH:mm"),
                ]
            }}>
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
                        <Form.Item label="Timing:" name="timings" required>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className='btn btn-primary form-btn' type='submit'>Update</button>
                    </Col>

                </Row>
            </Form>)}
        </Layout>
    )
}

export default Profile