import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { server } from "..";
import { useEffect } from "react";
import { hideLoading, showLoading } from "../redux/feature/alertSlice";
import { setUser } from "../redux/feature/userSlice";

const ProtectedRoutes = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const getUserData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${server}/user/getUserData`, {
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());

            if (res.data.success) {
                dispatch(setUser(res.data.data));
            } else {
                <Navigate to="/login" />
                localStorage.clear();
            }
        } catch (e) {
            dispatch(hideLoading());
            localStorage.clear();
            console.log('error', e);
        }
    };

    useEffect(() => {
        if (!user) {
            getUserData();
        }
    }, [user, getUserData]);

    if (localStorage.getItem("token")) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes