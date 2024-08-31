import {useEffect, useRef, useState} from "react"
import {FiUpload} from "react-icons/fi"
import {useDispatch, useSelector} from "react-redux"
import {http_profile_update_image} from "../../../../services/operations/SettingsAPI.js"
import UserIcon from "../../../assets/linxedu/user-icon.png";
import {LabelError} from "../../../../components/base/index.jsx";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

export default function ChangeProfilePicture() {
    const {token, user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        setErrorMessage("");
        const file = e.target.files[0]
        if (file) {
            setProfileImage(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        setErrorMessage("");
        if (!previewSource) {
            setErrorMessage(t("profile.pleaseAddImage"));
            return;
        }

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("profileImage", profileImage)

            dispatch(http_profile_update_image(token, formData)).then((response) => {
                response.status ? toast.success(t("profile.successUpdateAvatar")) : toast.error(response.msg);
                setLoading(false)
            })
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        if (profileImage) {
            previewFile(profileImage)
        }
    }, [profileImage])


    return (
        <>
            <div className="card bordered p-4">
                <div className="my-card-title">{t("profile.avatar")}</div>
                <div className="flex items-center gap-x-4">
                    <div className="avatar rounded-full bg-app-yellow shadow w-[96px] bordered border-2 border-app-base mr-3">
                        <img
                            src={previewSource ? previewSource : ((user.image === "") ? UserIcon : user?.image)}
                            alt={`profile-${user?.firstName}`}
                            className="avatar rounded-full aspect-square object-cover"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className={"my-form-label"}>{t("profile.changePicLabel")}</div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg, image/jpg"
                            />

                            <button
                                onClick={handleClick}
                                disabled={loading}
                                className="my-btn-cancel">
                                {t("btn.select")}
                            </button>

                            <button onClick={handleFileUpload} className={"my-btn-confirm"}>
                                {loading ? t("btn.uploading") : t("btn.upload")}
                                {!loading && <FiUpload className="text-md"/>}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {(errorMessage !== "") && <LabelError value={errorMessage}/>}
                </div>
            </div>
        </>
    )
}