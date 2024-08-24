import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {ConfirmationModal, WebLogo} from "../../../components/base/index.jsx";
import {appLocale} from "../../../locale/index.js";
import {FiSettings, FiUserCheck, FiLogOut} from "react-icons/fi";
import {getRouterPath, PathProfile, PathSettings} from "../../../services/router.js";
import {http_logout} from "../../../services/operations/authAPI.js";
import UserIcon from "../../../assets/linxedu/user-icon.png";

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <div className="navbar flex max-w-maxContent items-center justify-between shadow px-4">
            <Link to="/">
                <WebLogo/>
            </Link>

            <div className='flex gap-x-4 items-center'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="avatar rounded-full bg-app-yellow shadow bordered border-2 border-app-yellow">
                            <img
                                src={((user?.image) ? user?.image : ((user.image === "")) ? UserIcon : user?.image)}
                                alt={`profile-${user?.firstName}`}
                                className="avatar rounded-full aspect-square object-cover"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        <li><a className={"text-lg"} href={getRouterPath(PathSettings)}><FiSettings/>{appLocale["navBar"]["settings"]}</a></li>
                        <li><a className={"text-lg"} href={getRouterPath(PathProfile)}><FiUserCheck/>{appLocale["navBar"]["myProfile"]}</a></li>
                        <li><a className={"text-lg"} onClick={() => {
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
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}

export default Navbar
