import React from 'react'
const LoginUser = React.lazy(() => import('./auth/LoginUser.jsx'));
const SignUp = React.lazy(() => import('./auth/SignUp.jsx'));
const Dashboard = React.lazy(() => import('./Dashboard.jsx'));
export {LoginUser, SignUp, Dashboard}