import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {ConfirmationModal, WebLogo} from "../../../components/base/index.jsx";
import {FiSettings, FiUserCheck, FiLogOut} from "react-icons/fi";
import {AiOutlineDashboard} from "react-icons/ai";
import {getRouterPath, PathNotifications, PathProfile, PathSettings} from "../../../services/router.js";
import {http_logout} from "../../../services/operations/authAPI.js";
import { FaRegUser, FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import {useTranslation} from "react-i18next";
const Navbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token, user} = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <div className="navbar flex max-w-maxContent items-center justify-between shadow px-4">
            <Link to="/">
                <WebLogo/>
            </Link>

            <div className='flex gap-x-4 items-center'>
                <button className="btn btn-ghost btn-circle" onClick={() => navigate(getRouterPath(PathSettings))}>
                    <IoSettingsOutline fontSize={34}/>
                </button>
                <button className="btn btn-ghost btn-circle" onClick={() => navigate(getRouterPath(PathNotifications))}>
                    <FaRegBell fontSize={32}/>
                </button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <button className="btn btn-ghost btn-circle">
                            <FaRegUser fontSize={32}/>
                        </button>
                        {/*<div className="avatar rounded-full bg-app-yellow shadow bordered border-2 border-app-base">*/}
                        {/*    <img*/}
                        {/*        src={((user?.image) ? user?.image : ((user.image === "")) ? UserIcon : user?.image)}*/}
                        {/*        alt={`profile-${user?.firstName}`}*/}
                        {/*        className="avatar rounded-full aspect-square object-cover"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        {/*<li><a className={"my-menu"} href={"/"}><AiOutlineDashboard/>{["navBar"]["dashboard"]}</a></li>*/}
                        {/*<hr className="bordered border-neutral-300"/>*/}
                        {/*<li><a className={"my-menu"} href={getRouterPath(PathSettings)}><FiSettings/>{["navBar"]["settings"]}</a></li>*/}
                        {/*<li><a className={"my-menu"} href={getRouterPath(PathProfile)}><FiUserCheck/>{["navBar"]["myProfile"]}</a></li>*/}
                        {/*<hr className="bordered border-neutral-300"/>*/}
                        <li><a className={"my-menu"} onClick={() => {
                            setConfirmationModal({
                                text1: t("dialogLogout.title"),
                                text2: t("dialogLogout.desc"),
                                btn1Text: t("btn.logout"),
                                btn2Text: t("btn.cancel"),
                                btn1Handler: () => dispatch(http_logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }}><FiLogOut/>{t("btn.logout")}</a></li>
                    </ul>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}

export default Navbar
