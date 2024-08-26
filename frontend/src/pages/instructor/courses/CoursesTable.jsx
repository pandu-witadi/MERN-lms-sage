import {useSelector} from "react-redux"

import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import {useState} from "react"
import {FaCheck} from "react-icons/fa"
import {FiEdit2} from "react-icons/fi"
import {HiClock} from "react-icons/hi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {useNavigate} from "react-router-dom"

import {formatDate} from "../../../services/formatDate"
import {deleteCourse, fetchInstructorCourses,} from "../../../services/operations/courseDetailsAPI"
import {COURSE_STATUS} from "../../../utils/constants"
import ConfirmationModal from "../../../components/base/ConfirmationModal.jsx"
import toast from 'react-hot-toast'
import {useTranslation} from "react-i18next";

export default function CoursesTable({courses, setCourses, loading, setLoading}) {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth)

    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 35

    // delete course
    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        const toastId = toast.loading('Deleting...');
        await deleteCourse({courseId: courseId}, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
        toast.dismiss(toastId)
        console.log("All Course ", courses)
    }

    return (
        <>
            <Table className="rounded-2xl border border-neutral-500">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-3xl border-b border-neutral-500 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase">
                            {t("btn.courses")}
                        </Th>
                        <Th className="text-center text-sm font-medium uppercase w-[100px]">
                            {t("btn.duration")}
                        </Th>
                        <Th className="text-center text-sm font-medium uppercase w-[100px]">
                            {t("btn.status")}
                        </Th>
                        <Th className="text-center text-sm font-medium uppercase">
                            {t("btn.actions")}
                        </Th>
                    </Tr>
                </Thead>


                <Tbody>
                    {!loading && courses?.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium">
                                    {t("dashboard.noCoursesFound")}
                                </Td>
                            </Tr>
                        )
                        : (
                            courses?.map((course) => (
                                <Tr
                                    key={course._id}
                                    className="flex gap-x-10 border-b border-neutral-500 px-4 py-4"
                                >
                                    <Td className="flex flex-1 gap-x-4 relative">
                                        <img
                                            src={course?.thumbnail}
                                            alt={course?.courseName}
                                            className="h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                                        />

                                        <div className="flex flex-col">
                                            <div className="text-lg font-semibold capitalize">{course.courseName}</div>
                                            <div className="text-sm opacity-70">
                                                {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                                                    ? course.courseDescription
                                                    .split(" ")
                                                    .slice(0, TRUNCATE_LENGTH)
                                                    .join(" ") + "..."
                                                    : course.courseDescription}
                                            </div>

                                            {/* created At */}
                                            <div className="text-xs opacity-70 mt-4">
                                                {t("btn.created")}: {formatDate(course?.createdAt)}
                                            </div>

                                            {/* updated At */}
                                            <div className="text-xs opacity-70">
                                                {t("btn.updated")}: {formatDate(course?.updatedAt)}
                                            </div>
                                        </div>
                                    </Td>

                                    {/* course duration */}
                                    <Td className="text-sm font-medium text-center w-[100px]">-</Td>
                                    {/* course status */}
                                    <Td className="text-sm font-medium text-center w-[100px]">
                                        {course.status === COURSE_STATUS.DRAFT ? (
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                    <HiClock size={14}/>
                                                    Drafted
                                                </p>)
                                            :
                                            (
                                                <div
                                                    className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                    <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                        <FaCheck size={8}/>
                                                    </p>
                                                    Published
                                                </div>
                                            )}
                                    </Td>
                                    <Td className="text-sm font-medium text-center">
                                        {/* Edit button */}
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`)
                                            }}
                                            title="Edit"
                                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                        >
                                            <FiEdit2 size={20}/>
                                        </button>

                                        {/* Delete button */}
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2:
                                                        "All the data related to this course will be deleted",
                                                    btn1Text: !loading ? "Delete" : "Loading...  ",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => {
                                                        },
                                                    btn2Handler: !loading
                                                        ? () => setConfirmationModal(null)
                                                        : () => {
                                                        },

                                                })
                                            }}
                                            title="Delete"
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                        >
                                            <RiDeleteBin6Line size={20}/>
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                </Tbody>
            </Table>

            {/* Confirmation Modal */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
    )
}
