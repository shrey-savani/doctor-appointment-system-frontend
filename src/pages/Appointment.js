import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import axios from 'axios'
import { server } from '../index'
import { Table } from 'antd'
import moment from "moment"

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(`${server}/user/user-appointments`, {
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorInfo",
      render: (text, record) => (
        <span>
          {text.firstName} {text.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "doctorInfo",
      render: (text, record) => <span>{text?.phone}</span>,
    },
    {
      title: "Address",
      dataIndex: "doctorInfo",
      render: (text, record) => <span>{text?.address}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <>
          <span>
            {moment(record.date).format("DD-MM-YYYY")} &nbsp;
            {moment(record.time).format("HH:mm")}
          </span>

        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1>Appoinmtnets Lists</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointment