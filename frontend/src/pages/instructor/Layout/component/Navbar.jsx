import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {ConfirmationModal, WebLogo} from "../../../../components/base/index.jsx";
import {getRouterPath, PathNotifications, PathSettings} from "../../../../services/router.js";
import {http_logout} from "../../../../services/operations/authAPI.js";
import {IoSettingsOutline, IoHomeOutline, IoNotificationsOutline, IoPersonOutline} from "react-icons/io5";
import {useTranslation} from "react-i18next";

const Navbar = ({showHome}) => {
  const {t} = useTranslation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="navbar flex max-w-maxContent items-center justify-between shadow px-4">
      <Link to="/" className={"gap-4"}>
        {showHome ? <IoHomeOutline className={"my-navbar-button"}/> : <></>}
        <WebLogo/>
      </Link>

      <div className='flex gap-x-4 items-center'>
        <button className="btn btn-ghost btn-circle" onClick={() => navigate(getRouterPath(PathSettings))}>
          <IoSettingsOutline className={"my-navbar-button"}/>
        </button>
        <button className="btn btn-ghost btn-circle" onClick={() => navigate(getRouterPath(PathNotifications))}>
          <IoNotificationsOutline className={"my-navbar-button"}/>
        </button>
        <button className="btn btn-ghost btn-circle" onClick={() => {
          setConfirmationModal({
            text1: t("dialog.logOutTitle"),
            text2: t("dialog.logOutDesc"),
            btn1Text: t("btn.logout"),
            btn2Text: t("btn.cancel"),
            btn1Handler: () => dispatch(http_logout(navigate)),
            btn2Handler: () => setConfirmationModal(null),
          })
        }}>
          <IoPersonOutline className={"my-navbar-button"}/>
        </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Navbar
