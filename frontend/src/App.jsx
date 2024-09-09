import React, {Suspense} from "react"
import {
  Route,
  Routes,
} from "react-router-dom"
import {useSelector} from "react-redux"

import {LoginUser, SignUp, Dashboard} from "./pages";
import {
  LayoutInstructor,
  CoursesInstructor,
  SettingsInstructor,
  NotificationInstructor,
  CourseAddInstructor,
  CourseEditInstructor
} from "./pages/instructor";
import PageNotFound from "./pages/PageNotFound";
import CourseDetails from './pages/CourseDetails';
import Catalog from './pages/Catalog';

import OpenRoute from "./components/core/Auth/OpenRoute"
import ProtectedRoute from "./components/core/Auth/ProtectedRoute"
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'

import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"

import ViewCourse from "./pages/ViewCourse"
import VideoDetails from './components/core/ViewCourse/VideoDetails'

import {ACCOUNT_TYPE} from './utils/constants'
import CourseSectionPlayerTest from "./test/CourseSectionPlayerTest.jsx";
import {
  getRouterPath, PathCourseAdd, PathCourseEdit,
  PathLogin, PathNotifications,
  PathRoot, PathSettings,
  PathSignUp
} from "./services/router.js";
import {WebLoading} from "./components/base";
import './i18n';
import {useTranslation} from "react-i18next";

function App() {
  const {t} = useTranslation();
  const {user} = useSelector((state) => state.auth)
  return (
    <div data-theme={user?.theme || 'light'} className="w-screen h-screen flex flex-col">
      <Suspense fallback={
        <div className={"flex h-screen items-center justify-center"}>
          <WebLoading/>
        </div>
      }>
        <Routes>
          <Route path={getRouterPath(PathLogin)} element={
            <OpenRoute>
              <LoginUser/>
            </OpenRoute>
          }/>
          <Route path={getRouterPath(PathSignUp)} element={
            <OpenRoute>
              <SignUp/>
            </OpenRoute>
          }/>

          <Route path="catalog/:catalogName" element={<Catalog/>}/>
          <Route path="courses/:courseId" element={<CourseDetails/>}/>

          {/* Route only for Instructors. add course , MyCourses, EditCourse */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <Route element={
              <ProtectedRoute>
                <LayoutInstructor/>
              </ProtectedRoute>
            }>
              <Route path={getRouterPath(PathRoot)} element={<CoursesInstructor showHome={false}/>}/>
              <Route path={getRouterPath(PathSettings)} element={<SettingsInstructor showHome={true}/>}/>
              <Route path={getRouterPath(PathNotifications)} element={<NotificationInstructor showHome={true}/>}/>
              <Route path={getRouterPath(PathCourseAdd)} element={<CourseAddInstructor showHome={true}/>}/>
              <Route path={getRouterPath(PathCourseEdit)} element={<CourseEditInstructor showHome={true}/>}/>
            </Route>
          )}

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }>
              {/* Route only for Students */}
              {/* cart , EnrolledCourses */}
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path={getRouterPath(PathRoot)} element={<EnrolledCourses/>}/>
                </>
              )}
            </Route>
          )}

          {/* For the watching course lectures */}
          <Route
            element={
              <ProtectedRoute>
                <ViewCourse/>
              </ProtectedRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails/>}
                />
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-test/:subSectionId"
                  element={<CourseSectionPlayerTest/>}
                />
              </>
            )}
          </Route>
          <Route path={getRouterPath(PathRoot)} element={<LoginUser/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
