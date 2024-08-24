import React, {Suspense} from "react"
import {
    Route,
    Routes,
} from "react-router-dom"
import {useSelector} from "react-redux"

import {LoginUser, SignUp, Dashboard, Instructor, DashboardInstructor, ProfileInstructor, SettingsInstructor} from "./pages";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import CourseDetails from './pages/CourseDetails';
import Catalog from './pages/Catalog';

import OpenRoute from "./components/core/Auth/OpenRoute"
import ProtectedRoute from "./components/core/Auth/ProtectedRoute"

import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'

import Cart from "./components/core/Dashboard/Cart/Cart"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse"

import ViewCourse from "./pages/ViewCourse"
import VideoDetails from './components/core/ViewCourse/VideoDetails'

import {ACCOUNT_TYPE} from './utils/constants'
import CourseSectionPlayerTest from "./test/CourseSectionPlayerTest.jsx";
import {
    getRouterPath,
    PathDashboard,
    PathInstructorAddCourses,
    PathInstructorCourses,
    PathLogin,
    PathProfile, PathSettings,
    PathSignUp
} from "./services/router.js";
import {WebLoading} from "./components/base";

function App() {

    const {user} = useSelector((state) => state.profile)
    return (
        <div data-theme={user?.theme || 'light'} className="w-screen h-screen flex flex-col">
            <Suspense fallback={<WebLoading/>}>
                <Routes>
                    <Route path="*" element={<PageNotFound/>}/>
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

                    <Route path="/about" element={<About/>}/>
                    <Route path="catalog/:catalogName" element={<Catalog/>}/>
                    <Route path="courses/:courseId" element={<CourseDetails/>}/>

                    {/* Route only for Instructors */}
                    {/* add course , MyCourses, EditCourse*/}
                    {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                      <Route element={
                          <ProtectedRoute>
                              <DashboardInstructor/>
                          </ProtectedRoute>
                      }>
                          <>
                              <Route path={"/"} element={<Instructor/>}/>
                              <Route path={getRouterPath(PathDashboard)} element={<Instructor/>}/>
                              <Route path={getRouterPath(PathInstructorAddCourses)} element={<AddCourse/>}/>
                              <Route path={getRouterPath(PathInstructorCourses)} element={<MyCourses/>}/>
                              <Route path={getRouterPath(PathProfile)} element={<ProfileInstructor/>}/>
                              <Route path={getRouterPath(PathSettings)} element={<SettingsInstructor/>}/>
                              <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                          </>
                      </Route>
                    )}

                    <Route path="/" element={<LoginUser/>}/>

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
                                <Route path={getRouterPath(PathUserDashboard)} element={<EnrolledCourses/>}/>
                                <Route path="dashboard/cart" element={<Cart/>}/>
                                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
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
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
