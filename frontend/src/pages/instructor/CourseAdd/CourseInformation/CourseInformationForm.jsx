import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-hot-toast"
import {MdNavigateNext} from "react-icons/md"
import {useDispatch, useSelector} from "react-redux"

import {addCourseDetails, editCourseDetails, fetchCourseCategories} from "../../../../services/operations/courseDetailsAPI"
import {setCourse, setStep} from "../../../../reducer/slices/courseSlice"
import {COURSE_STATUS} from "../../../../utils/constants"
import IconBtn from "../../../../components/common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {

  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()

  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth)
  const {course, editCourse} = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode, It will add value in input field
    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories().then(r => {})
  }, [])


  const isFormUpdated = () => {
    const currentValues = getValues()
    return currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail;

  }

  //   handle next button click
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log('data -> ',data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
          // formData.append("tag", data.courseTags)
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        // send data to backend
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
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
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-card-border">
      <div className="flex flex-col gap-4">
        {/* Course Title */}
        <div className={"flex flex-col w-full gap-2"}>
          <label className="my-form-label" htmlFor="courseTitle">Course Title <sup className="text-error">*</sup></label>
          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", {required: true})}
            className="my-form-style"
          />
          {errors.courseTitle && (<span className="my-form-style-error">Course title is required</span>)}
        </div>

        {/* Course Short Description */}
        <div className={"flex flex-col w-full gap-2"}>
          <label className="my-form-label" htmlFor="courseShortDesc">Course Short Description <sup className="text-error">*</sup></label>
          <textarea
            id="courseShortDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", {required: true})}
            className="w-full my-form-area-style"
          />
          {errors.courseShortDesc && (<span className="my-form-style-error">Course Description is required</span>)}
        </div>

        {/* Benefits of the course */}
        <div className={"flex flex-col w-full gap-2"}>
          <label className="my-form-label" htmlFor="courseBenefits">Benefits of the course</label>
          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", {required: false})}
            className="w-full my-form-area-style"
          />
          {errors.courseBenefits && (<span className="ml-2 text-xs tracking-wide text-pink-200">Benefits of the course is required</span>)}
        </div>

        {/* Course Category */}
        <div className={"flex flex-col w-full gap-2"}>
          <label className="my-form-label" htmlFor="courseCategory">Course Category <sup className="text-error">*</sup></label>
          <select
            {...register("courseCategory", {required: true})}
            defaultValue=""
            id="courseCategory"
            className="my-form-style">
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories?.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (<span className="my-form-style-error">Course Category is required</span>)}
        </div>

        {/* Course Tags */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter or Comma"
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Requirements/Instructions */}
        <RequirementsField
          label="Requirements/Instructions"
          name="courseRequirements"
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* Course Thumbnail Image */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        <div className="divider"/>

        {/* Next Button */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold
              text-richblack-900 bg-richblack-300 hover:bg-richblack-900 hover:text-richblack-300 duration-300`}
            >
              Continue Wihout Saving
            </button>
          )}
          <button
            className={"my-btn-confirm"}
            disabled={loading}
          >
            <MdNavigateNext/>
            {!editCourse ? "Next" : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  )
}


