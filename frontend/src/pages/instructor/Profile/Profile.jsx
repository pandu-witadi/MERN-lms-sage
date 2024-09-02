import ChangeProfilePicture from "./component/ChangeProfilePicture.jsx"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {http_get_profile} from "../../../services/operations/profileAPI.js";
import {toast} from "react-hot-toast";
import {setLoading} from "src/reducer/slices/authSlice.js";
import EditProfile from "./component/EditProfile.jsx"
import {useTranslation} from "react-i18next";

export default function Profile() {
    const { t } = useTranslation();
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
        <div className={"gap-4"}>
            <h1 className="my-page-title">
                {t("profile.editProfile")}
            </h1>

            <ChangeProfilePicture/>
            <EditProfile/>
        </div>
    )
}