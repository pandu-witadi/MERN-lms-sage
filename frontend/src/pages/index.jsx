import React from 'react'
const LoginUser = React.lazy(() => import('./auth/LoginUser.jsx'));
const SignUp = React.lazy(() => import('./auth/SignUp.jsx'));
const Dashboard = React.lazy(() => import('./Dashboard.jsx'));

// Instructor
const DashboardInstructor = React.lazy(() => import('./instructor/DashboardInstructor.jsx'));
const Courses = React.lazy(() => import('./instructor/Courses/Courses.jsx'));
const ProfileInstructor = React.lazy(() => import('./instructor/Profile/ProfileInstructor.jsx'));
const SettingsInstructor = React.lazy(() => import('./instructor/Profile/SettingsInstructor.jsx'));
export {LoginUser, SignUp, Dashboard, DashboardInstructor, Courses, ProfileInstructor, SettingsInstructor}