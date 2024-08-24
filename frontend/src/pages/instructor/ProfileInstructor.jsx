import ChangeProfilePicture from "./profile/ChangeProfilePicture.jsx"
import {appLocale} from "../../locale/index.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {http_get_profile} from "../../services/operations/profileAPI.js";
import {toast} from "react-hot-toast";
import {setLoading} from "../../reducer/slices/profileSlice.js";
// import DeleteAccount from "./profile/DeleteAccount.jsx"
import EditProfile from "./profile/EditProfile.jsx"
// import UpdatePassword from "./profile/UpdatePassword.jsx"

export default function ProfileInstructor() {
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
                {appLocale["profile"]["editProfile"]}
            </h1>
            {/* Change Profile Picture */}
            <ChangeProfilePicture/>

            {/* Profile */}
            <EditProfile/>
            {/* Password */}
            {/*<UpdatePassword />*/}

            {/*/!* Delete Account *!/*/}
            {/*<DeleteAccount />*/}
        </div>
    )
}