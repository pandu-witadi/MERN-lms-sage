import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {http_get_profile} from "../../../services/operations/profileAPI.js";
import {toast} from "react-hot-toast";
import {setLoading} from "../../../reducer/slices/authSlice.js";
import EditProfile from "./component/EditProfile.jsx"
import UpdatePassword from "./component/UpdatePassword.jsx"
import EditTheme from "./component/EditTheme.jsx";
import {useTranslation} from "react-i18next";
import Navbar from "../Layout/component/Navbar.jsx";

export default function Settings({showHome}) {
  const {t} = useTranslation();
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(http_get_profile(token, navigate)).then((response) => {
      if (!response.status) {
        toast.error(response.msg);
      }
    });
    dispatch(setLoading(false));
  }, []);

  return (
    <div className={"h-full"}>
      <Navbar showHome={showHome}/>
      <div className={"my-contents"}>
        <h1 className="my-page-title">
          {t("settings.title")}
        </h1>

        {/* Profile */}
        <EditProfile/>

        {/* Password */}
        <UpdatePassword/>

        {/* Edit Theme */}
        <EditTheme/>
      </div>
    </div>
  )
}