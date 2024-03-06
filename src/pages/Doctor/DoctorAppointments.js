import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { Table, message } from 'antd'
import moment from "moment"
import { server } from '../../index'
import axios from 'axios'

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get(`${server}/doctor/doctor-appointment`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { 
        getAppointments();
    }, []);

    const handleStatus = async(record, status)=>{
        try{
            const res = await axios.post(`${server}/doctor/update-status`,{appointmentId: record._id, status},{
                headers: {
                    Authorization:  `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(res.data.success){
                message.success(res.data.message);
                getAppointments();
            }
        }catch(e){
            console.log(e)
            message.error("Something went wrong")
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        {
            title: "Name",
            dataIndex: "userInfo",
            render: (text, record) => (
                <span>{text.name}</span>
            )
        },
        {
            title: "Email",
            dataIndex: "userInfo",
            render: (text, record) => (
                <span>{text?.email}</span>
            )
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
               <div className="d-flex">
                    {
                        record.status === "pending" && (
                            <div className="d-flex">
                                <button className='btn btn-success' onClick={()=>handleStatus(record, "approve")}>Approved</button>
                                <button className='btn btn-danger ms-2' onClick={()=>handleStatus(record, "reject")}>Reject</button>
                            </div>
                        )
                    }
               </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1>Doctor Appoinmtnets</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments