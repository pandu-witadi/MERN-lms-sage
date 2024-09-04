import React from "react"
import {useSelector} from "react-redux"

import Step2CourseBuilder from "./Step2CourseBuilder.jsx"
import Step1CourseForm from "./Step1CourseForm.jsx"
import Step3PublishCourse from "./Step3PublishCourse.jsx"
import {useTranslation} from "react-i18next";

export default function StepsRender() {
  const {t} = useTranslation();
  const {step} = useSelector((state) => state.course);
  const steps = t("course.addCourseSteps", {returnObjects: true});

  return (
    <div className={""}>
      <div className={"mb-4"}>
        <ul className={"w-full steps"}>
          {steps.map((item) => (
            <li key={item.id} className={`step ${step >= item.id ? "step-warning" : "step-neutral"}`}>
              {item.title}
            </li>))}
        </ul>
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <Step1CourseForm/>}
      {step === 2 && <Step2CourseBuilder/>}
      {step === 3 && <Step3PublishCourse/>}
    </div>
  )
}