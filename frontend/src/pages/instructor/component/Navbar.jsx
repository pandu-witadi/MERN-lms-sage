import React, {useState, useEffect} from 'react'
import {Link, matchPath, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {fetchCourseCategories} from './../../../services/operations/courseDetailsAPI';
import {ConfirmationModal, WebLogo} from "../../../components/base/index.jsx";
import {appLocale} from "../../../locale/index.js";
import { FiSettings, FiUserCheck, FiLogOut } from "react-icons/fi";
import {getRouterPath, PathProfile, PathSettings} from "../../../services/router.js";
import {http_logout} from "../../../services/operations/authAPI.js";
import Img from "../../../components/common/Img.jsx";

const Navbar = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart)
  const location = useLocation();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchSublinks = async () => {
    try {
      setLoading(true)
      const res = await fetchCourseCategories();
      // const result = await apiConnector("GET", categories.CATEGORIES_API);
      // const result = await apiConnector('GET', 'http://localhost:4000/api/v1/course/showAllCategories');
      // console.log("Printing Sublinks result:", result);
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
    setLoading(false)
  }

  // console.log('data of store  = ', useSelector((state)=> state))


  useEffect(() => {
    fetchSublinks().then(r => {
    });
  }, [])


  // when user click Navbar link then it will hold yellow color
  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }


  // when user scroll down , we will hide navbar , and if suddenly scroll up , we will show navbar
  const [showNavbar, setShowNavbar] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    }
  },)

  // control Navbar
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY)
        setShowNavbar('hide')

      else setShowNavbar('show')
    } else setShowNavbar('top')

    setLastScrollY(window.scrollY);
  }

  return (
    <div className="navbar flex max-w-maxContent items-center justify-between shadow">
      <Link to="/">
        <WebLogo/>
      </Link>

      <div className='flex gap-x-4 items-center'>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full shadow bg-app-yellow">
            {
              (user?.image) ? (
                <Img
                  src={user.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square h-[78px] rounded-full object-cover"
                  // className="aspect-square w-12 object-cover"
                />
              ) : (
                <div className="avatar placeholder justify-center text-center">
                  <div className="avatar text-app-primary-content w-12 text-lg">
                    <span>SY</span>
                  </div>
                </div>
              )
            }
            </div>
            {/*<div className="w-10 rounded-full">*/}
            {/*  <img*/}
            {/*    alt="Tailwind CSS Navbar component"*/}
            {/*    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>*/}
            {/*</div>*/}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
            <li><a className={"text-lg"} href={getRouterPath(PathSettings)}><FiSettings/>{appLocale["navBar"]["settings"]}</a></li>
            <li><a className={"text-lg"} href={getRouterPath(PathProfile)}><FiUserCheck/>{appLocale["navBar"]["myProfile"]}</a></li>
            <li><a className={"text-lg"} onClick={()=>{
              setConfirmationModal({
                text1: appLocale["dialogLogout"]["title"],
                text2: appLocale["dialogLogout"]["desc"],
                btn1Text: appLocale["btn"]["logout"],
                btn2Text: appLocale["btn"]["cancel"],
                btn1Handler: () => dispatch(http_logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }}><FiLogOut/>{appLocale["btn"]["logout"]}</a></li>
          </ul>
        </div>
        {/* for large devices */}
        {/*{token !== null && <ProfileDropDown/>}*/}

        {/*for small devices*/}
        {/*{token !== null && <MobileProfileDropDown/>}*/}

      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Navbar
