import React, {useEffect, useState} from "react";
import Navbar from "../Layout/component/Navbar.jsx";
import {useTranslation} from "react-i18next";
import Step1CourseForm from "./component/Step1CourseForm.jsx";
import Step2CourseBuilder from "./component/Step2CourseBuilder.jsx";
import Step3PublishCourse from "./component/Step3PublishCourse.jsx";
import {http_get_full_course_details} from "../../../services/operations/courseDetailsAPI.js";
import {useSelector} from "react-redux";
import {WebLoading} from "../../../components/base/index.jsx";
import {useParams} from "react-router-dom";
import {StepBuilder, StepPublish} from "../../../services/router.js";

export default function CourseAdd({showHome}) {
    const { token } = useSelector((state) => state.auth)
    const {t} = useTranslation();
    const {courseId, stepMode} = useParams();
    const steps = t("course.addCourseSteps", {returnObjects: true});
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(null);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const fetchFullCourseDetails = async () => {
            setLoading(true)
            const result = await http_get_full_course_details(courseId, token);
            if (result?.courseDetails) {
                setCourse(result?.courseDetails);
            }
            setLoading(false)
        }

        if(stepMode !== undefined) {
            fetchFullCourseDetails().then(r => {
            });
        }

        if(stepMode === StepPublish) {
            setStep(3);
        }
        else if(stepMode === StepBuilder) {
            setStep(2);
        }
        else {
            setStep(1);
        }
    }, [])

    if (loading) {
        return (<div className={"flex justify-center items-center h-screen"}><WebLoading /></div>)
    }

    return (
        <div className={"h-full"}>
            <Navbar showHome={showHome}/>
            <div className={"my-contents"}>
                <div className={"gap-4"}>
                    <div className="my-page-title">
                        {t("course.addCourse")}
                    </div>
                </div>
                <div className={"mb-4"}>
                    <ul className={"w-full steps"}>
                        {steps.map((item) => (
                            <li key={item.id} className={`step ${step >= item.id ? "step-warning" : "step-neutral"}`}>
                                {item.title}
                            </li>))}
                    </ul>
                </div>

                {/* Render specific component based on current step */}
                {stepMode === undefined && <Step1CourseForm course={course} isEditCourse={false}/>}
                {stepMode === StepBuilder && <Step2CourseBuilder course={course}/>}
                {stepMode === StepPublish && <Step3PublishCourse/>}
            </div>
        </div>
    )
}