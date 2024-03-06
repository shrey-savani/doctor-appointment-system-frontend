import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Spinner from "./component/Spinner.js"
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './component/ProtectedRoutes.js'
import PublicRoutes from './component/PublicRoutes.js'
import ApplyDoctor from './pages/ApplyDoctor.js'
import NotificationPage from './pages/NotificationPage.js'
import Users from './pages/Admin/Users.js'
import Doctors from './pages/Admin/Doctors.js'
import Profile from './pages/Doctor/Profile.js'
import Appointment from './pages/Appointment.js'
import BookingPage from "./pages/BookingPage.js"
import DoctorAppointments from './pages/Doctor/DoctorAppointments.js'
import UserProfile from './pages/UserProfile.js'

const App = () => {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading ? <Spinner /> :
        <Routes>
          <Route path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            } />

          <Route path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            } />

          <Route path="/profile"
            element={
              <ProtectedRoutes>
                <UserProfile />
              </ProtectedRoutes>
            } />
          <Route path="/notification"
            element={
              <ProtectedRoutes>
                <NotificationPage />
              </ProtectedRoutes>
            } />

          <Route path="/doctor/profile/:id"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            } />

          <Route path="/appointment"
            element={
              <ProtectedRoutes>
                <Appointment />
              </ProtectedRoutes>
            } />

          <Route path="/doctor-appointment"
            element={
              <ProtectedRoutes>
                <DoctorAppointments />
              </ProtectedRoutes>
            } />

          <Route path="doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoutes>
                <BookingPage />
              </ProtectedRoutes>
            } />

          <Route path="/admin/doctors"
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            } />

          <Route path="/admin/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            } />

          <Route path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            } />

          <Route path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            } />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default App