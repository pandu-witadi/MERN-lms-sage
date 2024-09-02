import {useEffect} from "react";
import RenderSteps from "./RenderSteps"
import Navbar from "../Layout/component/Navbar.jsx";
import {useTranslation} from "react-i18next";


export default function CourseAdd({showHome}) {
  const {t} = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className={"h-full"}>
      <Navbar showHome={showHome}/>
      <div className={"my-contents"}>
        <div className={"gap-4"}>
          <div className="my-page-title">
            {t('course.addCourse')}
          </div>
        </div>

        <RenderSteps/>
      </div>
    </div>
  )
}