import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import Layout from '../component/Layout'
import { Row } from 'antd'
import DoctorList from '../component/DoctorList'

const Home = () => {
  const [doctor, setDoctor] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.post(`${server}/user/getUserData`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    } catch (e) {
      console.log('error', e);
    }
  };

  const fetchDoctor = async () => {
    const res = await axios.get(`${server}/user/getAllDoctors`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    if (res.data.success) {
      setDoctor(res.data.data)
    }
  }
  
  useEffect(() => {
    fetchDoctor()
    getUserData();
  }, []);

  return (
    <Layout children>
      <h1 className='text-center'>Home Page</h1>
      <Row>
        {doctor && doctor.map(doctor => (
          <DoctorList doctor={doctor} />
        ))}
      </Row>
    </Layout>
  )
}

export default Home