import React, { Children } from 'react';
import "../styles/Layout.css";
import { adminSidebarMenu, userSidebarMenu } from '../Data/Data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message, Badge } from 'antd';
import { setUser } from '../redux/feature/userSlice';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onLogoutHandler = () => {
        localStorage.clear();
        message.success("Logout Successfully");
        navigate("/login")
        dispatch(setUser(""));
    }

    const doctorSidebarMenu = [{
        name: 'Home',
        path: "/",
        icon: "fa-solid fa-house"
    }, {
        name: 'Appointment',
        path: "/doctor-appointment",
        icon: "fa-solid fa-list"
    }, {
        name: 'Profile',
        path: `/doctor/profile/${user?._id}`,
        icon: "fa-solid fa-user"
    }];

    const SidebarMenu = user?.isAdmin ? adminSidebarMenu : user?.isDoctor ? doctorSidebarMenu : userSidebarMenu;

    return (
        <div className='main'>
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <h6 className='text-white'>Doc App</h6>
                        <hr />
                    </div>
                    <div className="menu">
                        {SidebarMenu.map((data, i) => {
                            const isActive = location?.pathname === data?.path
                            return (
                                <div className={`menu-item ${isActive && "active"}`} key={i}>
                                    <i className={data?.icon}></i>
                                    <Link to={data?.path}>{data?.name}</Link>
                                </div>
                            )
                        })}
                        <div className={`menu-item`} onClick={onLogoutHandler}>
                            <i className="fa-solid fa-power-off"></i>
                            <Link to="/login">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        <div className="header-content" style={{ cursor: "pointer" }}>
                            <Badge style={{ marginRight: "12px"}} count={user && user?.notification.length} onClick={() => { navigate('/notification') }}>
                                <i className="fa-solid fa-bell"></i>
                            </Badge>
                            <Link to={"/profile"}>{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout;