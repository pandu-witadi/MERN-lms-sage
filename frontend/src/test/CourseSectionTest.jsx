import courseTest from './data/course-test.js'
import {BsChevronDown} from "react-icons/bs";
import {useState} from "react";
import {setCourseViewSidebar} from "../slices/sidebarSlice.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CourseSectionTest = () => {
    const navigate = useNavigate();
    const [activeStatus, setActiveStatus] = useState("") // store curr section id
    const [section, setSection] = useState(courseTest) // store curr section id
    const [videoBarActive, setVideoBarActive] = useState("") // store curr SubSection Id
    const {
        courseEntireData,
    } = useSelector((state) => state.viewCourse)
    const {courseViewSidebar} = useSelector(state => state.sidebar);

    return(
        <>
            <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                onClick={() => setActiveStatus(section?._id)}>
                <div className="flex justify-between bg-richblack-700 px-5 py-4">
                    <div className="w-[70%] font-semibold">
                        {section?.sectionName}
                    </div>
                    <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lession {section?.subSection.length}
                  </span>
                        <span
                            className={`${activeStatus === section?._id
                                ? "rotate-0 transition-all duration-500"
                                : "rotate-180"
                            } `}
                        >
                    <BsChevronDown/>
                  </span>
                    </div>
                </div>

                {activeStatus === section?._id && (
                    <div className="transition-[height] duration-500 ease-in-out">
                        {section.subSection.map((topic, i) => (
                            <div
                                className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                                    ? "bg-yellow-200 font-semibold text-richblack-800"
                                    : "hover:bg-richblack-900"
                                } `}
                                key={i}
                                onClick={() => {
                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-test/${topic?._id}`)
                                    setVideoBarActive(topic._id)
                                    courseViewSidebar && window.innerWidth <= 640 ? dispatch(setCourseViewSidebar(false)) : null;
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => {
                                    }}
                                />
                                {topic.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default CourseSectionTest