import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../component/Layout'

const UserProfile = () => {
    const { user } = useSelector(state => state.user)
    return (
        <Layout>
            <div className='p-2 m-2'>
                <h3>Your Details:</h3>
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Email:</b> {user?.email}</p>
            </div>
        </Layout>
    )
}

export default UserProfile