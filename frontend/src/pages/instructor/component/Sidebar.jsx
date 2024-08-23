import {useEffect, useState} from "react"
import {VscSignOut} from "react-icons/vsc"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {http_logout} from "../../../services/operations/authAPI"
import {HiMenuAlt1} from 'react-icons/hi'
import {IoMdClose} from 'react-icons/io'

import {setOpenSideMenu, setScreenSize} from "../../../reducer/slices/sidebarSlice";
import {WebLoading, ConfirmationModal, SidebarLink} from "../../../components/base/index.jsx";
import {appLocale} from "../../../locale/index.js";
import {ACCOUNT_TYPE} from "../../../utils/constants.js";
import {getRouterPath, PathDashboard, PathInstructorAddCourses, PathInstructorCourses} from "../../../services/router.js";

export default function Sidebar() {
  const {user, loading: profileLoading} = useSelector((state) => state.profile)
  const {loading: authLoading} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)
  const {openSideMenu, screenSize} = useSelector((state) => state.sidebar)

  const sidebarLinks = [
    {
      id: 1,
      name: appLocale["navBar"]["dashboard"],
      path: getRouterPath(PathDashboard),
      type: ACCOUNT_TYPE.INSTRUCTOR,
      icon: "VscDashboard",
    },
    {
      id: 2,
      name: appLocale["navBar"]["myCourses"],
      path: getRouterPath(PathInstructorCourses),
      type: ACCOUNT_TYPE.INSTRUCTOR,
      icon: "VscVm",
    },
    {
      id: 3,
      name: appLocale["navBar"]["addCourses"],
      path: getRouterPath(PathInstructorAddCourses),
      type: ACCOUNT_TYPE.INSTRUCTOR,
      icon: "VscAdd",
    },
  ];

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth))

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // If screen size is small then close the sidebar
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setOpenSideMenu(false))
    } else dispatch(setOpenSideMenu(true))
  }, [screenSize])


  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px]">
        <WebLoading/>
      </div>
    )
  }

  return (
    <>
      <div className="sm:hidden text-white absolute left-7 top-3 cursor-pointer" onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}>
        {
          openSideMenu ? <IoMdClose size={33} className={'text-neutral'}/> : <HiMenuAlt1 size={33} className={'text-neutral'}/>
        }
      </div>


      {
        openSideMenu &&
        <div className={`flex min-w-[250px] flex-col border-r-[1px] border-app-border ${openSideMenu ? "py-10" : ""}`}>
          <div className="flex flex-col mt-6">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} setOpenSideMenu={setOpenSideMenu}/>
              )
            })}
          </div>
        </div>
      }


      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}