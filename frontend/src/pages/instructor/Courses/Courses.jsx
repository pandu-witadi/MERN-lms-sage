import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {http_instructor_courses} from "../../../services/operations/courseDetailsAPI.js"
import {http_get_courses} from "../../../services/operations/profileAPI.js"
import {VscAdd} from "react-icons/vsc";
import {getRouterPath, PathCourseAdd} from "../../../services/router.js";
import {useTranslation} from "react-i18next";
import {BsGrid, BsPeople} from "react-icons/bs";
import CoursesTable from "./component/CoursesTable.jsx";
import Navbar from "../Layout/component/Navbar.jsx";
import {resetCourseState} from "../../../reducer/slices/courseSlice.js";

export default function Courses({showHome}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token, user} = useSelector((state) => state.auth)
  const {t} = useTranslation();
  const [instructorData, setInstructorData] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false);

  // get Instructor Data
  useEffect(() => {
    (async () => {
      dispatch(resetCourseState())
      setLoading(true);
      const instructorApiData = await http_get_courses(token)
      const result = await http_instructor_courses(token)
      if (instructorApiData["msg"].length) {
        setInstructorData(instructorApiData["msg"])
      }
      if (result) {
        setCourses(result)
      }
      setLoading(false);
    })()
  }, [])
  const totalStudents = Array.isArray(instructorData) ? instructorData?.reduce((acc, curr) => acc + curr["totalStudentsEnrolled"], 0) : 0;
  return (
    <div className={"h-full"}>
      <Navbar showHome={showHome}/>
      <div className={"my-contents"}>
        <div className={"gap-4"}>
          <div className="my-page-title">
            {t('dashboard.welcome')}, <span className={'text-app-base'}>{user?.firstName}</span>
          </div>
        </div>


        <div className={"flex sm:flex-row flex-col gap-4"}>
          <div className="stats shadow border border-neutral-300">
            <div className="stat">
              <div className="stat-title">{t("dashboard.totalCourses")}</div>
              <div className="stat-value">{courses.length}</div>
              <div className="stat-figure ml-4 text-app-base">
                <BsGrid fontSize={42}/>
              </div>
            </div>
          </div>
          <div className="stats shadow border border-neutral-300">
            <div className="stat">
              <div className="stat-title">{t("dashboard.totalStudent")}</div>
              <div className="stat-value">{(isNaN(totalStudents)) ? 0 : totalStudents}</div>
              <div className="stat-figure ml-4 text-app-base">
                <BsPeople fontSize={42}/>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-between">
          <div className="my-card-title">{t("dashboard.myCourses")}</div>
          <button className={"my-btn-confirm pl-1 pr-1"} onClick={() => navigate(getRouterPath(PathCourseAdd))}>
            <VscAdd/> {t("btn.addCourse")}
          </button>
        </div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses} loading={loading} setLoading={setLoading}/>}
      </div>
    </div>
  )
}
