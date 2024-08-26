import React from 'react'
const LoginUser = React.lazy(() => import('./auth/LoginUser.jsx'));
const SignUp = React.lazy(() => import('./auth/SignUp.jsx'));
const Dashboard = React.lazy(() => import('./Dashboard.jsx'));

// Instructor
const DashboardInstructor = React.lazy(() => import('./instructor/DashboardInstructor.jsx'));
const CoursesList = React.lazy(() => import('./instructor/CoursesList.jsx'));
const ProfileInstructor = React.lazy(() => import('./instructor/ProfileInstructor.jsx'));
const SettingsInstructor = React.lazy(() => import('./instructor/SettingsInstructor.jsx'));
export {LoginUser, SignUp, Dashboard, DashboardInstructor, CoursesList, ProfileInstructor, SettingsInstructor}