import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"

import {http_get_full_course_details,} from "../../../services/operations/courseDetailsAPI.js"
import {WebLoading} from "../../../components/base/index.jsx";
import Navbar from "../Layout/component/Navbar.jsx";
import {useTranslation} from "react-i18next";
import Step1CourseForm from "./component/Step1CourseForm.jsx";
import Step2CourseBuilder from "./component/Step2CourseBuilder.jsx";
import Step3PublishCourse from "./component/Step3PublishCourse.jsx";
import {StepBuilder, StepForm, StepPublish} from "../../../services/router.js";

export default function CourseEdit({showHome}) {
  const {t} = useTranslation();
  const {courseId, stepMode} = useParams();
  const {token} = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(false)
  const [invalidStep, setInvalidStep] = useState(false)
  const [step, setStep] = useState(1);
  const steps = t("course.addCourseSteps", {returnObjects: true});

  useEffect(() => {
    const fetchFullCourseDetails = async () => {
      setLoading(true)
      const result = await http_get_full_course_details(courseId, token);
      if (result?.courseDetails) {
        setCourse(result?.courseDetails);
      }
      setLoading(false)
    }

    fetchFullCourseDetails().then(r => {
    });

    setInvalidStep(false);
    if (stepMode === StepPublish) {
      setStep(3);
    } else if (stepMode === StepBuilder) {
      setStep(2);
    } else if (stepMode === StepForm) {
      setStep(1);
    } else {
      setInvalidStep(true);
    }
  }, [stepMode])

  // Loading
  if (loading) {
    return (<div className={"flex justify-center items-center h-screen"}><WebLoading/></div>)
  }

  return (
    <div className={"h-full"}>
      <Navbar showHome={showHome}/>
      <div className={"my-contents"}>
        {loading ? <div className={"my-child-loading-container"}><WebLoading/></div>
          :
          (<div>
            {course ?
              <>
                {invalidStep ? <p className="my-big-label-for-info">{t("course.invalidStep")}</p> :
                  <>
                    <div className={"gap-4"}>
                      <div className="my-page-title">
                        {t('course.editCourse')}
                      </div>
                    </div>

                    <div className={"mb-4"}>
                      <ul className={"w-full steps"}>
                        {steps.map((item, index) => (
                          <li key={item.id} className={`step ${step >= item.id ? "step-warning" : "step-neutral"}`} data-content={step > item.id ? "✓" : item.id}>
                            {item.title}
                          </li>))}
                      </ul>
                    </div>

                    {stepMode === StepForm && <Step1CourseForm course={course} isEditCourse={true}/>}
                    {stepMode === StepBuilder && <Step2CourseBuilder course={course} setCourse={setCourse}/>}
                    {stepMode === StepPublish && <Step3PublishCourse/>}
                  </>
                }
              </>
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