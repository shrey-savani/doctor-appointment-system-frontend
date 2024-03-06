import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/feature/alertSlice';
const BookingPage = () => {
    const [doctor, setDoctor] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const getDoctorData = async () => {
        try {
            const res = await axios.post(`${server}/doctor/getDoctorById`, { doctorId: params.doctorId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleBooking = async () => {
        try {
            setIsAvailable(true);
            if (!date && !time) {
                return alert("Date & Time Required");
            }
            dispatch(showLoading());

            const res = await axios.post(`${server}/user/book-appointmnet`, {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctor,
                date: date,
                time: time,
                userInfo: user
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (e) {
            dispatch(hideLoading());
            console.log(e)
        }
    }

    const handleAvailability = async () => {
        try {
            dispatch(showLoading());

            const res = await axios.post(`${server}/user/booking-availabilty`, {
                doctorId: params.doctorId, date, time
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                message.success(res.data.message)
            } else {
                message.success(res.data.message)
            }
        } catch (e) {
            dispatch(hideLoading());
            console.log(e)
        }
    }
    useEffect(() => {
        getDoctorData();
    }, [])
    return (
        <Layout>
            <h1>Booking Page</h1>
            <div className="container m-2">
                {doctor && (
                    <div>
                        <h5 className='m-1'>
                            Dr.{doctor.firstName} {doctor.lastName}
                        </h5>
                        <h5 className='m-1'>Fees : {doctor.feesPerConsultation}</h5>
                        <h5 className='m-1'>
                            Timings : {doctor.timings && doctor.timings[0]} - {" "}
                            {doctor.timings && doctor.timings[1]}{" "}
                        </h5>
                        <div className="d-flex flex-column w-50">
                            <DatePicker
                                aria-required={"true"}
                                className="m-1"
                                format="DD-MM-YYYY"
                                onChange={(value) => {
                                    setDate(moment(value).format("DD-MM-YYYY"));
                                }}
                            />
                            <TimePicker
                                aria-required={"true"}
                                format="HH:mm"
                                className="m-1"
                                onChange={(value) => {
                                    setTime(moment(value).format("HH:mm"));
                                }}
                            />

                            <button className="btn btn-primary mt-2" onClick={handleAvailability}>
                                Check Availability
                            </button>

                            <button className="btn btn-dark mt-2" onClick={handleBooking}>
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage