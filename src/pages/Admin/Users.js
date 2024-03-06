import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import axios from 'axios';
import { server } from '../../index';
import { Table } from 'antd';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getDoctorData = async () => {
            try {
                const res = await axios.get(`${server}/admin/users-list`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.data.success) {
                    setUsers(res.data.data);
                }
            } catch (e) {
                console.log('Error: ', e.message);
            }
        };

        getDoctorData();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        }, {
            title: "Email",
            dataIndex: "email"
        }, {
            title: "Doctor",
            dataIndex: "isDoctor",
            render: (text, record) => {
                return(
                    <span>{record?.isDoctor ? "Yes" : "No"}</span>
                )
            }
        }, {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    <button className='btn btn-danger'>
                        Block
                    </button>
                </div>
            )
        }]
    return (
        <Layout>
            <h3>
                Users
            </h3>
            <Table columns={columns} dataSource={users} />

        </Layout>
    )
}

export default Users