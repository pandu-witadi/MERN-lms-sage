import React from 'react'
const LoginUser = React.lazy(() => import('./auth/LoginUser.jsx'));
const SignUp = React.lazy(() => import('./auth/SignUp.jsx'));
const Dashboard = React.lazy(() => import('./Dashboard.jsx'));

// Instructor
const DashboardInstructor = React.lazy(() => import('./instructor/DashboardInstructor.jsx'));
const Instructor = React.lazy(() => import('./instructor/Instructor.jsx'));
export {LoginUser, SignUp, Dashboard, DashboardInstructor, Instructor}