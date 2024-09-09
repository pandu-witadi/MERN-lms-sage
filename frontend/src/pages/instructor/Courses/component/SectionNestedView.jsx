import { useState } from "react"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoChevronDown, IoBookmarksOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { TiPlusOutline } from "react-icons/ti";

import {http_section_delete, http_subsection_delete} from "../../../../services/operations/courseDetailsAPI.js"
import ConfirmationModal from "../../../../components/base/ConfirmationModal.jsx"
import SubSectionModal from "./SubSectionModal.jsx"
import {useTranslation} from "react-i18next";

export default function SectionNestedView({course, setCourse, handleChangeEditSectionName }) {
  const {t} = useTranslation();
  const { token } = useSelector((state) => state.auth)

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  // Delete Section
  const handleDeleteSection = async (sectionId) => {
    const result = await http_section_delete({ sectionId, courseId: course._id, token, })
    if (result) {
      setCourse(result);
    }
    setConfirmationModal(null)
  }

  // Delete SubSection
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await http_subsection_delete({ subSectionId, sectionId, token })
    if (result) {
      // update the structure of course - As we have got only updated section details
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      setCourse(updatedCourse);
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div className="rounded-2xl bg-richblack-700 p-6 px-8">
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 py-2">
              {/* sectionName */}
              <div className="flex items-center gap-x-3">
                <AiOutlineMenuUnfold className="text-xl" />
                <p className="font-semibold">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-x-3">
                {/* Change Edit SectionName button */}
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <CiEdit className="text-xl" />
                </button>

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: t("dialog.deleteSectionTitle"),
                      text2: t("dialog.deleteSectionDesc"),
                      btn1Text: t("btn.delete"),
                      btn2Text: t("btn.cancel"),
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <CiTrash className="text-xl" />
                </button>

                <div className="divider divider-horizontal m-1"/>
                <IoChevronDown className={"text-xl"} />
              </div>

            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <IoBookmarksOutline className="text-xl" />
                    <div className="font-semibold">{data.title}</div>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: t("dialog.deleteSubSectionTitle"),
                          text2: t("dialog.deleteSubSectionDesc"),
                          btn1Text: t("btn.delete"),
                          btn2Text: t("btn.cancel"),
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-neutral-600 text-base"
              >
                <TiPlusOutline />
                <div>{t("course.lectureAdd")}</div>
              </button>
            </div>
          </details>
        ))}
      </div>



      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          course={course}
          setCourse={setCourse}
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          course={course}
          setCourse={setCourse}
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          course={course}
          setCourse={setCourse}
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}

      {/* Confirmation Modal */}
      {confirmationModal ? (<ConfirmationModal modalData={confirmationModal} />) : (<></>)}
    </>
  )
}