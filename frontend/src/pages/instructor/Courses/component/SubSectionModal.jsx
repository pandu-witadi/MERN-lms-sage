import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"

import {
  http_subsection_create, http_subsection_update,
} from "../../../../services/operations/courseDetailsAPI.js"
import {useTranslation} from "react-i18next";
import UploadFile from "../../../../components/base/UploadFile.jsx";

export default function SubSectionModal({course, setCourse, modalData, setModalData, add = false, view = false, edit = false, }) {
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const lectureTypeList = t("course.lectureTypeList", { returnObjects: true });


  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title ?? "");
      setValue("lectureDesc", modalData.description ?? "");
      setValue("lectureType", modalData.lectureType ?? "");
      setValue("lectureUrl", modalData.lectureUrl ?? "");
      setValue("lectureContent", modalData.lectureContent ?? "");
    }
  }, [])

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()

    return currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureType !== modalData.lectureType ||
      currentValues.lectureUrl !== modalData.lectureUrl;

  }

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues()

    const formData = new FormData()
    formData.append("courseId", course.courseId);
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureType !== modalData.lectureType) {
      formData.append("lectureType", currentValues.lectureType)
    }
    if (currentValues.lectureUrl !== modalData.lectureUrl) {
      formData.append("lectureUrl", currentValues.lectureUrl)
    }
    if (currentValues.lectureContent !== modalData.lectureContent) {
      formData.append("lectureContent", currentValues.lectureContent)
    }
    setLoading(true)

    const result = await http_subsection_update(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      setCourse(updatedCourse);
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        await handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("courseId", course.courseId);
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("lectureType", data.lectureType);
    formData.append("lectureUrl", data.lectureUrl);
    formData.append("lectureContent", data.lectureContent);
    setLoading(true)
    const result = await http_subsection_create(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      setCourse(updatedCourse);
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-95 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-neutral-400 bg-base">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-200 p-5">
          <div className="text-xl font-semibold">{view && t("course.lectureView")} {add && t("course.lectureAdd")} {edit && t("course.lectureEdit")}</div>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="my-form-label" htmlFor="lectureTitle">{t("course.lectureTitle")} {!view &&
              <sup className="text-error">*</sup>}</label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              {...register("lectureTitle", {required: true})}
              className="my-form-style"
            />
            {errors.lectureTitle && (<span className="my-form-style-error">{t("course.lectureTitle")} {t("isNeeded")}</span>)}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="my-form-label" htmlFor="lectureDesc">{t("course.lectureDesc")}{!view &&
              <sup className="text-error">*</sup>}</label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              {...register("lectureDesc", {required: true})}
              className="my-form-area-style"
            />
            {errors.lectureDesc && (<span className="my-form-style-error">{t("course.lectureDesc")} {t("isNeeded")}</span>)}
          </div>
          {}
          <div className="flex flex-col space-y-2">
            <label className="my-form-label">{t("course.lectureType")}</label>
            <select
              id="lectureType"
              {...register("lectureType", {required: true})}
              defaultValue={""}
              className="my-form-select-style"
            >
              <option disabled value={""}>{t("course.lectureSelectType")}</option>
              {lectureTypeList.map((value, i) => {
                return (
                  <option key={i} value={value.id}>
                    {value.title}
                  </option>
                )
              })}
            </select>
            {errors.lectureType && (<span className="my-form-style-error">{t("course.lectureType")} {t("isNeeded")}</span>)}
          </div>

          {/* Lecture File Upload */}
          <UploadFile
            name="lectureUrl"
            label={t("course.lectureAttachment")}
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
          />

          {!view && (
            <div className="flex justify-end">
              <button disabled={loading}
                      className={"my-btn-confirm"}>{loading ? t("btn.loading") : edit ? t("btn.saveChanged") : t("btn.save")}</button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}