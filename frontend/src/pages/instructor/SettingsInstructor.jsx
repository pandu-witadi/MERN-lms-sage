import {appLocale} from "../../locale/index.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {http_get_profile} from "../../services/operations/profileAPI.js";
import {toast} from "react-hot-toast";
import {setLoading} from "../../reducer/slices/profileSlice.js";
// import ChangeProfilePicture from "./profile/ChangeProfilePicture.jsx"
import EditProfile from "./profile/EditProfile.jsx"
import UpdatePassword from "./profile/UpdatePassword.jsx"
import EditTheme from "./profile/EditTheme.jsx";
// import DeleteAccount from "./profile/DeleteAccount.jsx"

export default function SettingsInstructor() {
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
        <div className={"m-4 gap-4"}>
            <h1 className="my-page-title">
                {appLocale["navBar"]["settings"]}
            </h1>
            {/* Change Profile Picture */}
            {/*<ChangeProfilePicture/>*/}

            {/* Profile */}
            <EditProfile/>

            {/* Password */}
            <UpdatePassword />

            {/* Edit Theme */}
            <EditTheme />

            {/*/!* Delete Account *!/*/}
            {/*<DeleteAccount />*/}
        </div>
    )
}