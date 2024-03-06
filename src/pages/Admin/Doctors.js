import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import axios from 'axios'
import { server } from '../../index'
import { Table, message } from 'antd'

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const getDoctorData = async () => {
            try {
                const res = await axios.get(`${server}/admin/doctors-list`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.data.success) {
                    setDoctors(res.data.data);
                }
            } catch (e) {
                console.log('Error: ', e.message);
            }
        };

        getDoctorData();
    }, []);

    const handleStatusChange = async (record, status) => {
        try {
            const res = await axios.post(`${server}/admin/change-account-status`, { doctorId: record._id,userId: record.userId, status: status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (e) {
            message.error("Something Went Wrong")
        }
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        }, {
            title: "Status",
            dataIndex: "status"
        }, {
            title: "Phone",
            dataIndex: "phone"
        }, {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {
                        record.status === "pending"
                            ? <button className='btn btn-success' onClick={()=>handleStatusChange(record, "approved")}>
                                Approve
                            </button>
                            : <button className='btn btn-danger' onClick={()=>handleStatusChange(record, "pending")}>
                                Reject
                            </button>
                    }

                </div>
            )
        }]
    return (
        <Layout>
            <h1 className='p-2'>Doctor Request</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctors