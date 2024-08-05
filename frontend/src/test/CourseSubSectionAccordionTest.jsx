import React from "react"
import { LuListChecks } from "react-icons/lu";

function CourseSubSectionAccordionTest({ subSec }) {
    return (
        <div>
            <div className="flex justify-between py-2">
                <div className={`flex items-center gap-2`}>
          <span>
            <LuListChecks />
          </span>
                    <p>{subSec?.title}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseSubSectionAccordionTest