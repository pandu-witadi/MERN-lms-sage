import React, {Suspense} from "react"
import {
    Route,
    Routes,
} from "react-router-dom"
import {useSelector} from "react-redux"

import {LoginUser, SignUp, Dashboard, Instructor} from "./pages";
import Home from "./pages/Home"
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import CourseDetails from './pages/CourseDetails';
import Catalog from './pages/Catalog';

import OpenRoute from "./components/core/Auth/OpenRoute"
import ProtectedRoute from "./components/core/Auth/ProtectedRoute"

import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings/Settings"
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'

import Cart from "./components/core/Dashboard/Cart/Cart"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse"

import ViewCourse from "./pages/ViewCourse"
import VideoDetails from './components/core/ViewCourse/VideoDetails'

import {ACCOUNT_TYPE} from './utils/constants'
import CourseSectionPlayerTest from "./test/CourseSectionPlayerTest.jsx";
import Navbar from "./components/common/Navbar"
import {getRouterPath, PathLogin, PathSignUp, PathUserDashboard} from "./services/router.js";

function App() {

    const {user} = useSelector((state) => state.profile)
    return (
        <div data-theme="light" className="w-screen min-h-screen flex flex-col">
            {/*<Navbar/>*/}

            <Suspense
                fallback={
                    <div className="pt-3 h-full text-center">
                        <span className="loading loading-bars loading-xs"></span>
                        <span className="loading loading-bars loading-sm"></span>
                        <span className="loading loading-bars loading-md"></span>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                }
            >
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

                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="catalog/:catalogName" element={<Catalog/>}/>
                    <Route path="courses/:courseId" element={<CourseDetails/>}/>


                    {/* Dashboard */}
                    <Route element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }>
                        <Route path="dashboard/my-profile" element={<MyProfile/>}/>
                        <Route path="dashboard/Settings" element={<Settings/>}/>

                        {/* Route only for Students */}
                        {/* cart , EnrolledCourses */}
                        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <>
                                <Route path={getRouterPath(PathUserDashboard)} element={<EnrolledCourses/>}/>
                                <Route path="dashboard/cart" element={<Cart/>}/>
                                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                            </>
                        )}

                        {/* Route only for Instructors */}
                        {/* add course , MyCourses, EditCourse*/}
                        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                            <>
                                <Route path={getRouterPath(PathUserDashboard)} element={<Instructor/>}/>
                                <Route path="dashboard/instructor" element={<Instructor/>}/>
                                <Route path="dashboard/add-course" element={<AddCourse/>}/>
                                <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                            </>
                        )}
                    </Route>


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
