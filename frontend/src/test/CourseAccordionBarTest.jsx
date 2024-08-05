import {IoMdArrowDropdown} from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import CourseSubSectionAccordionTest from "./CourseSubSectionAccordionTest.jsx";
import course from './data/course-test.js'

const CourseAccordionBarTest = ({}) => {
    const contentEl = useRef(null)
    const [active, setActive] = useState(false)
    const [sectionHeight, setSectionHeight] = useState(0)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0)
    }, [active])

    const handleActive = (id) => {
        setIsActive(!isActive);
        setActive(!active);
    }

    return (
        <>
            <div
                className='overflow-hidden border border-solid border-richblack-600 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 last:mb-0 duration-200 '>
                <div>
                    <div
                        className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]`}
                        onClick={() => {
                            handleActive(course._id)
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <i
                                className={isActive ? "rotate-180 duration-300" : "rotate-0 duration-300"}
                            >
                                <IoMdArrowDropdown size={25}/>
                            </i>
                            <p>{course?.sectionName}</p>
                        </div>
                        <div className="space-x-4">
            <span className="text-yellow-25">
              {`${course.subSection.length || 0} lecture(s)`}
            </span>
                        </div>
                    </div>
                </div>

                <div
                    ref={contentEl}
                    className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                    style={{height: sectionHeight,}}
                >
                    <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
                        {course?.subSection?.map((subSec, i) => {
                            return <CourseSubSectionAccordionTest subSec={subSec} key={i}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CourseAccordionBarTest