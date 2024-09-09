import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-hot-toast"
import {MdNavigateNext} from "react-icons/md"
import {useSelector} from "react-redux"

import {
  http_add_course_details, http_edit_course_details,
  http_get_categories
} from "../../../../services/operations/courseDetailsAPI.js"
import {COURSE_STATUS} from "../../../../utils/constants.js"
import ChipInput from "./ChipInput.jsx"
import {useTranslation} from "react-i18next";
import {UploadImage, WebLoading} from "../../../../components/base/index.jsx";
import {useNavigate} from "react-router-dom";
import {getRouterPath, PathCourseEdit, StepBuilder} from "../../../../services/router.js";

export default function Step1CourseForm({course, isEditCourse = false}) {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const { token } = useSelector((state) => state.auth)
  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await http_get_categories();
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    // if form is in edit mode, It will add value in input field
    if (isEditCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category._id)
      setValue("courseTags", course.tag)
      // setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories().then(() => {});
  }, [])


  const isFormUpdated = () => {
    const currentValues = getValues()
    return currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      // currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail;

  }

  //   handle next button click
  const onSubmit = async (data) => {
    if (isEditCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("currentCourseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        formData.append("instructions", "[]");
        // if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
        //   formData.append("instructions", JSON.stringify(data.courseRequirements))
        // }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        // send data to backend
        setLoading(true)
        const result = await http_edit_course_details(formData, token)
        setLoading(false)
        if (result) {
          navigate(getRouterPath(PathCourseEdit,"/", {courseId: course._id, stepMode: StepBuilder})) // navigate to next step
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    // user has visited first time to step 1
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify([]))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await http_add_course_details(formData, token)
    if (result) {
      navigate(getRouterPath(PathCourseEdit,"/", {courseId: result._id, stepMode: StepBuilder})) // navigate to next step
    }
    setLoading(false)
  }

  return (loading ? <div className={"my-child-loading-container"}><WebLoading/></div> :
      <form onSubmit={handleSubmit(onSubmit)} className="my-card-border">
        <div className="flex flex-col gap-4">
          {/* Course Title */}
          <div className={"flex flex-col w-full gap-2"}>
            <label className="my-form-label" htmlFor="courseTitle">{t("course.courseTitle")} <sup className="text-error">*</sup></label>
            <input
              id="courseTitle"
              // placeholder="Enter Course Title"
              {...register("courseTitle", {required: true})}
              className="my-form-style"
            />
            {errors.courseTitle && (<span className="my-form-style-error">{t("course.courseTitle")} {t("isNeeded")}</span>)}
          </div>

          {/* Course Short Description */}
          <div className={"flex flex-col w-full gap-2"}>
            <label className="my-form-label" htmlFor="courseShortDesc">{t("course.courseDescription")} <sup
              className="text-error">*</sup></label>
            <textarea
              id="courseShortDesc"
              // placeholder="Enter Description"
              {...register("courseShortDesc", {required: true})}
              className="w-full my-form-area-style"
            />
            {errors.courseShortDesc && (<span className="my-form-style-error">{t("course.courseDescription")} {t("isNeeded")}</span>)}
          </div>

          {/* Benefits of the course */}
          <div className={"flex flex-col w-full gap-2"}>
            <label className="my-form-label" htmlFor="courseBenefits">{t("course.courseBenefits")}</label>
            <textarea
              id="courseBenefits"
              // placeholder="Enter benefits of the course"
              {...register("courseBenefits", {required: false})}
              className="w-full my-form-area-style"
            />
            {errors.courseBenefits && (<span className="my-form-style-error">{errors.courseBenefits.message}</span>)}
          </div>

          {/* Course Category */}
          <div className={"flex flex-col w-full gap-2"}>
            <label className="my-form-label" htmlFor="courseCategory">{t("course.courseCategory")} <sup
              className="text-error">*</sup></label>
            <select
              id="courseCategory"
              {...register("courseCategory", {required: true})}
              defaultValue={""}
              className="my-form-select-style"
            >
              <option value="" disabled>
                {t("course.courseSelectCategory")}
              </option>
              {!loading &&
                courseCategories?.map((category, index) => (
                  <option key={index} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
            </select>
            {errors.courseCategory && (<span className="my-form-style-error">{t("course.courseCategory")} {t("isNeeded")}</span>)}
          </div>

          {/* Course Tags */}
          <ChipInput
            label={t("course.courseTags")}
            name="courseTags"
            placeholder={t("tagPlaceHolder")}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            required={true}
          />

          {/*/!* Course Tags *!/*/}
          {/*<ChipInput*/}
          {/*  label={t("course.courseInstructions")}*/}
          {/*  name="courseRequirements"*/}
          {/*  placeholder={t("tagPlaceHolder")}*/}
          {/*  register={register}*/}
          {/*  errors={errors}*/}
          {/*  setValue={setValue}*/}
          {/*  getValues={getValues}*/}
          {/*  required={false}*/}
          {/*/>*/}

          {/* Course Thumbnail Image */}
          <UploadImage
            label={t("course.courseThumbnail")}
            name="courseImage"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
          />

          <div className="divider"/>

          {/* Next Button */}
          <div className="flex justify-end gap-x-2">
            {isEditCourse && (
              <button
                onClick={() => navigate(getRouterPath(PathCourseEdit,"/", {courseId: course._id, stepMode: StepBuilder}))}
                disabled={loading}
                className={"my-btn-cancel"}>
                {t("btn.nextWithoutSave")}
              </button>
            )}
            <button className={"my-btn-confirm"} disabled={loading}>
              {!isEditCourse ? t("btn.next") : t("btn.saveChanged")}<MdNavigateNext/>
            </button>
          </div>
        </div>
      </form>
  );
}


