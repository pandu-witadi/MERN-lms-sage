import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {useSelector} from "react-redux"
import {http_change_password} from "../../../services/operations/SettingsAPI"
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

export default function UpdatePassword() {
    const { t } = useTranslation();
    const {token} = useSelector((state) => state.auth)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    })

    const submitPasswordForm = async (data) => {
        try {
            const response = await http_change_password(token, data);
            if (response.status) {
                toast.success(t("profile.successUpdatePassword"));

                // Setting default values after form submission
                reset({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className={"mt-4"}>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div className="my-card-border">
                    <div className="my-card-title">{t("btn.password")}</div>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* Current Password */}
                        <div className="relative flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="oldPassword" className="my-form-label">{t("profile.currentPassword")}</label>
                            <input
                              type={showOldPassword ? "text" : "password"}
                              name="oldPassword"
                              id="oldPassword"
                              placeholder=""
                              className="my-form-style"
                              {...register("oldPassword", {required: true})}
                              defaultValue={""}
                            />

                            <span onClick={() => setShowOldPassword((prev) => !prev)}
                                  className="absolute right-3 sm:top-[42px] top-[32px] z-[10] cursor-pointer">
                                {showOldPassword ? (
                                  <AiOutlineEyeInvisible fontSize={24}/>
                                ) : (
                                  <AiOutlineEye fontSize={24}/>
                                )}
                            </span>
                            {errors.oldPassword && (
                              <span className="my-form-style-error">{t("profile.currentPasswordError")}</span>)}
                        </div>

                        {/* new password */}
                        <div className="relative flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="newPassword" className="my-form-label">{t("profile.newPassword")}</label>

                            <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              id="newPassword"
                              placeholder=""
                              className="my-form-style"
                              {...register("newPassword", {required: true})}
                            />

                            <span onClick={() => setShowNewPassword((prev) => !prev)}
                                  className="absolute right-3 sm:top-[42px] top-[32px] z-[10] cursor-pointer">
                            {showNewPassword ? (
                              <AiOutlineEyeInvisible fontSize={24}/>
                            ) : (
                              <AiOutlineEye fontSize={24}/>
                            )}
                        </span>
                            {errors.newPassword && (
                              <span className="my-form-style-error">{t("profile.newPasswordError")}</span>)}
                        </div>

                        {/*confirm new password */}
                        <div className="relative flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="newPassword" className="my-form-label">{t("profile.newPasswordConfirm")}</label>

                            <input
                              type={showConfirmNewPassword ? "text" : "password"}
                              name="confirmNewPassword"
                              id="confirmNewPassword"
                              placeholder=""
                              className="my-form-style"
                              {...register("confirmNewPassword", {required: true})}
                            />

                            <span onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                                  className="absolute right-3 sm:top-[42px] top-[32px] z-[10] cursor-pointer">
                              {showConfirmNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24}/>
                              ) : (
                                <AiOutlineEye fontSize={24}/>
                              )}
                            </span>
                            {errors.confirmNewPassword && (
                              <span className="my-form-style-error">{t("profile.newPasswordConfirmError")}</span>)}
                        </div>

                    </div>
                    <div className="divider"/>
                    <div className="flex justify-end gap-5">
                        <button type={"submit"} className={"my-btn-confirm"}>{t("btn.save")}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}