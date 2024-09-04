import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {http_get_full_course_details,} from "../../../services/operations/courseDetailsAPI.js"
import { setCourse, setEditCourse } from "../../../reducer/slices/courseSlice"
import {WebLoading} from "../../../components/base/index.jsx";
import StepsRender from "./component/StepsRender.jsx";
import Navbar from "../Layout/component/Navbar.jsx";
import {useTranslation} from "react-i18next";

export default function CourseEdit({showHome}) {
  const {t} = useTranslation();
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchFullCourseDetails = async () => {
      setLoading(true)
      const result = await http_get_full_course_details(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    }

    fetchFullCourseDetails().then(r => {});
  }, [])

  // Loading
  if (loading) {
    return (<div className={"flex justify-center items-center h-screen"}><WebLoading /></div>)
  }

  return (
    <div className={"h-full"}>
      <Navbar showHome={showHome}/>
      <div className={"my-contents"}>
        <div className={"gap-4"}>
          <div className="my-page-title">
            {t('course.editCourse')}
          </div>
        </div>
        {loading ? <div className={"my-child-loading-container"}><WebLoading/></div>
          :
          (<div>
            {course ? <StepsRender/>
              :
              (<p className="my-big-label-for-info">
                {t("course.courseNotFound")}
              </p>)
            }
          </div>)}
      </div>
    </div>
  )
}