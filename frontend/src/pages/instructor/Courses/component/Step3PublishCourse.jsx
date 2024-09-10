import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {http_edit_course_details} from "../../../../services/operations/courseDetailsAPI"
import {COURSE_STATUS} from "../../../../utils/constants"
import {useTranslation} from "react-i18next";
import {MdNavigateBefore} from "react-icons/md";
import {getRouterPath, PathCourseEdit, PathRoot, StepBuilder} from "../../../../services/router.js";
import {IoHomeOutline} from "react-icons/io5";

export default function Step3PublishCourse({course}) {
  const {t} = useTranslation();
  const {register, handleSubmit, setValue, getValues} = useForm()

  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    navigate(getRouterPath(PathCourseEdit, "/", {courseId: course._id, stepMode: StepBuilder})) // navigate to next step
  }

  const goToCourses = () => {
    navigate(getRouterPath(PathRoot));
  }

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("currentCourseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await http_edit_course_details(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleCoursePublish().then(r => {
    })
  }

  return (
    <div className="my-card-border">
      <div className="text-2xl font-semibold">{t("course.lecturePublishSettings")}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="h-4 w-4 rounded"
            />
            <span className="ml-2"> {t("course.lectureSetAsPublic")}</span>
          </label>
        </div>

        <div className="divider"/>

        {/* Next Prev Button */}
        <div className={"flex flex-row justify-between"}>
          <button className={"my-btn-home"} disabled={loading} onClick={() => navigate(getRouterPath(PathRoot))}>
            <IoHomeOutline/> {t("btn.cancel")}
          </button>
          <div className="flex justify-end gap-x-3">
            <button onClick={goBack} className={"my-btn-cancel"}><MdNavigateBefore/> {t("btn.back")}</button>
            <button disabled={loading} className={"my-btn-confirm"} onClick={handleCoursePublish}>{t("btn.saveChanged")}</button>
          </div>
        </div>
      </form>
    </div>
  )
}