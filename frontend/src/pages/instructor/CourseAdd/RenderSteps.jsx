import React from "react"
import {useSelector} from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"
import {useTranslation} from "react-i18next";

export default function RenderSteps() {
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
      {step === 1 && <CourseInformationForm/>}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 && <PublishCourse/>}
    </div>
  )
}