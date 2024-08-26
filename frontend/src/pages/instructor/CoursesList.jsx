import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {Link, useNavigate} from "react-router-dom"

import { fetchInstructorCourses } from "../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../services/operations/profileAPI"
import IconBtn from "../../components/common/IconBtn.jsx";
import {VscAdd} from "react-icons/vsc";
// import CoursesTable from "./courses/CoursesTable.jsx";
import {getRouterPath, PathInstructorAddCourses} from "../../services/router.js";
import {appLocale} from "../../locale/index.js";

export default function CoursesList() {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])


  // get Instructor Data
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)


  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5 text-center sm:text-left">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200 text-center sm:text-left">
          Let's start something new
        </p>
      </div>


      <div className={"flex sm:flex-row flex-col gap-4"}>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{appLocale["dashboard"]["totalCourses"]}</div>
            <div className="stat-value">{courses.length}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">{appLocale["dashboard"]["totalStudent"]}</div>
            <div className="stat-value">89,400</div>
          </div>
        </div>
      </div>

      <div className="mb-14 flex justify-between">
        {/* <div className="mb-14 flex items-center justify-between"> */}
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate(getRouterPath(PathInstructorAddCourses))}
        >
          <VscAdd/>
        </IconBtn>
      </div>
      {/*{courses && <CoursesTable courses={courses} setCourses={setCourses} loading={loading} setLoading={setLoading} />}*/}
      {/*) : (*/}
      {/*  <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">*/}
      {/*    <p className="text-center text-2xl font-bold text-richblack-5">*/}
      {/*      You have not created any courses yet*/}
      {/*    </p>*/}

      {/*    <Link to="/dashboard/add-course">*/}
      {/*      <p className="mt-1 text-center text-lg font-semibold text-yellow-50">*/}
      {/*        Create a course*/}
      {/*      </p>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}
