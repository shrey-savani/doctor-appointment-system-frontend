import React from 'react'
import Layout from '../component/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/feature/alertSlice'
import axios from "axios"
import { server } from "../index.js"
import { setUser } from '../redux/feature/userSlice.js'

const NotificationPage = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${server}/user/get-all-notification`, { userId: user?._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(res.data.data));

            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (e) {
            dispatch(hideLoading());
            console.log(e);
            message.error("Something went wrong");
        }
    }

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${server}/user/delete-all-notification`, { userId: user?._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            dispatch(setUser(res.data.data));
            
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (e) {
            dispatch(hideLoading());
            console.log(e);
            message.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <h4 className='p-2 text-center'>NotificationPage</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2" style={{cursor: "pointer"}} onClick={handleMarkAllRead}>
                            Mark All Read
                        </h4>
                    </div>
                    {
                        user?.notification.map((notificationMsg, i) => (
                            <div className="card m-2" key={i}>
                                <div className="card-text p-2">
                                    {notificationMsg?.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end cursor-pointer">
                        <h4 className="p-2 text-primary" onClick={handleDeleteAllRead} style={{cursor: "pointer"}}>
                            Delete All Read
                        </h4>
                    </div>
                    {
                        user?.seennotification.map((notificationMsg, i) => (
                            <div className="card m-2" key={i}>
                                <div className="card-text p-2">
                                    {notificationMsg?.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage