import React from 'react'

const Layout = React.lazy(() => import('./Layout/Layout.jsx'));
const Courses = React.lazy(() => import('./Courses/Courses.jsx'));
const Settings = React.lazy(() => import('./Profile/Settings.jsx'));
const Notification = React.lazy(() => import('./Notification/Notification.jsx'));
const CourseAdd = React.lazy(() => import('./Courses/CourseAdd.jsx'));
const CourseEdit = React.lazy(() => import('./Courses/CourseEdit.jsx'));
export {
  Layout as LayoutInstructor,
  Courses as CoursesInstructor,
  Settings as SettingsInstructor,
  Notification as NotificationInstructor,
  CourseAdd as CourseAddInstructor,
  CourseEdit as CourseEditInstructor
}