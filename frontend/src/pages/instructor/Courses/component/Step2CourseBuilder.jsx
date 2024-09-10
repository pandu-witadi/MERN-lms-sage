import {useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-hot-toast"
import {IoAddCircleOutline, IoHomeOutline} from "react-icons/io5"
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md"
import {useSelector} from "react-redux"

import {http_section_create, http_section_update} from "../../../../services/operations/courseDetailsAPI.js"
import SectionNestedView from "./SectionNestedView.jsx"
import {useNavigate} from "react-router-dom";
import {getRouterPath, PathCourseEdit, PathRoot, StepForm, StepPublish} from "../../../../services/router.js";
import {useTranslation} from "react-i18next";


export default function Step2CourseBuilder({course, setCourse}) {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {register, handleSubmit, setValue, formState: {errors},} = useForm()
  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null) // stored section ID

  // handle form submission
  const onSubmit = async (data) => {
    setLoading(true)

    let result = null;
    if (editSectionName) {
      result = await http_section_update({sectionName: data.sectionName, sectionId: editSectionName, courseId: course._id,}, token);
    } else {
      result = await http_section_create({sectionName: data.sectionName, courseId: course._id,}, token);
    }

    if (result) {
      setCourse(result);
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  }

  // cancel edit
  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  // Change Edit SectionName
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  // go To Next
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error(t("toast.minimumModuleNotFulfilled"));
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error(t("toast.minimumLectureNotFulfilled"));
      return;
    }

    // all set go ahead
    navigate(getRouterPath(PathCourseEdit, "/", {courseId: course._id, stepMode: StepPublish})) // navigate to next step
  }

  // go Back
  const goBack = () => {
    navigate(getRouterPath(PathCourseEdit, "/", {courseId: course._id, stepMode: StepForm})) // navigate to next step
  }

  return (
    <div className="my-card-border">
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
        {/* Section Name */}
        <div className="flex flex-col gap-2">
          <label className="my-form-label" htmlFor="sectionName">
            {t("course.sectionName")} <sup className="text-error">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder={t("course.sectionNamePlaceholder")}
            {...register("sectionName", {required: true})}
            className="my-form-style"
          />
          {errors.sectionName && (
            <span className="my-form-style-error">{t("course.sectionName")} {t("isNeeded")}</span>
          )}
        </div>

        {/* Edit Section Name OR Create Section */}
        <div className="flex flex-row gap-4">
          <button disabled={loading} className={"my-btn-confirm-outline"}>
            <IoAddCircleOutline size={20}/> {editSectionName ? t("btn.sectionEdit") : t("btn.sectionCreate")}
          </button>
          {/* if editSectionName mode is on */}
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm underline"
            >
              {t("btn.cancelEdit")}
            </button>
          )}
        </div>
      </form>

      {/* nested view of section - subSection */}
      {course.courseContent.length > 0 && (
        <SectionNestedView course={course} setCourse={setCourse} handleChangeEditSectionName={handleChangeEditSectionName}/>
      )}

      <div className="divider"/>

      {/* Next Prev Button */}
      <div className={"flex flex-row justify-between"}>
        <button className={"my-btn-home"} disabled={loading} onClick={() => navigate(getRouterPath(PathRoot))}>
          <IoHomeOutline/> {t("btn.cancel")}
        </button>
        <div className="flex justify-end gap-x-3">
          <button onClick={goBack} className={"my-btn-cancel"}><MdNavigateBefore/> {t("btn.back")}</button>

          {/* Next button */}
          <button disabled={loading} className={"my-btn-confirm"} onClick={goToNext}>{t("btn.next")}<MdNavigateNext/></button>
        </div>
      </div>
    </div>
  )
}