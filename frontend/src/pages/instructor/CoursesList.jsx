import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {fetchInstructorCourses} from "../../services/operations/courseDetailsAPI"
import {http_get_courses} from "../../services/operations/profileAPI"
import {VscAdd} from "react-icons/vsc";
import {getRouterPath, PathInstructorAddCourses} from "../../services/router.js";
import {useTranslation} from "react-i18next";
import {BsGrid, BsPeople} from "react-icons/bs";
import CoursesTable from "./courses/CoursesTable.jsx";

export default function CoursesList() {
    const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {t} = useTranslation();
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false);


    // get Instructor Data
    useEffect(() => {
        (async () => {
            setLoading(true);
            const instructorApiData = await http_get_courses(token)
            const result = await fetchInstructorCourses(token)
            if (instructorApiData["msg"].length) {
                setInstructorData(instructorApiData["msg"])
            }
            if (result) {
                setCourses(result)
            }
            setLoading(false);
        })()
    }, [])
    const totalStudents = (instructorData?.reduce((acc, curr) => acc + curr["totalStudentsEnrolled"], 0)) ?? 0;
    return (
        <div>
            <div className={"gap-4"}>
                <div className="my-page-title">
                    {t('dashboard.welcome')}, <span className={'text-app-base'}>{user?.firstName}</span>
                </div>
            </div>


            <div className={"flex sm:flex-row flex-col gap-4"}>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">{t("dashboard.totalCourses")}</div>
                        <div className="stat-value">{courses.length}</div>
                        <div className="stat-figure ml-4 text-app-base">
                            <BsGrid fontSize={42}/>
                        </div>
                    </div>
                </div>
                <div className="stats shadow">
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
                <button className={"my-btn-confirm pl-1 pr-1"} onClick={() => navigate(getRouterPath(PathInstructorAddCourses))}>
                    <VscAdd/> {t("btn.addCourse")}
                </button>
            </div>
            {courses && <CoursesTable courses={courses} setCourses={setCourses} loading={loading} setLoading={setLoading}/>}
        </div>
    )
}
