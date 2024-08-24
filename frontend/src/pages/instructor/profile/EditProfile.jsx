import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {http_profile_update} from "../../../services/operations/SettingsAPI";
import {appLocale} from "../../../locale/index.js";
import {setLoading} from "../../../reducer/slices/profileSlice.js";
import {toast} from "react-hot-toast";

export default function EditProfile() {
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const genders = appLocale["profile"]["genderList"]

    const {register, handleSubmit, formState: {errors}} = useForm()

    const submitProfileForm = (data) => {
        dispatch(setLoading(true));
        dispatch(http_profile_update(token, data)).then((response) => {
            response.status ? toast.success(appLocale["profile"]["successUpdateProfile"]) : toast.error(response.msg);
        })
        dispatch(setLoading(false));
    }

    return (
        <div className={"mt-4"}>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                {/* Profile Information */}
                <div className="my-card-border">
                    <div className="my-card-title">{appLocale["btn"]["profile"]}</div>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="firstName" className="my-form-label">{appLocale["profile"]["firstName"]}</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder={appLocale["profile"]["firstNamePlaceholder"]}
                                className="my-form-style"
                                {...register("firstName", {required: true})}
                                defaultValue={user?.firstName}
                            />
                            {errors.firstName && (<span className="my-form-style-error">{appLocale["profile"]["firstNamePlaceholder"]}</span>)}
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="lastName" className="my-form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder={appLocale["profile"]["lastNamePlaceholder"]}
                                className="my-form-style"
                                {...register("lastName", {required: true})}
                                defaultValue={user?.lastName}
                            />
                            {errors.lastName && (<span className="my-form-style-error">{appLocale["profile"]["lastNamePlaceholder"]}</span>)}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row mt-4">
                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="dateOfBirth" className="my-form-label">{appLocale["profile"]["dateOfBirth"]}</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="my-form-style"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: false,
                                        message: "Please enter your Date of Birth.",
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />
                            {errors.dateOfBirth && (<span className="my-form-style-error">{errors.dateOfBirth.message}</span>)}
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="gender" className="my-form-label">{appLocale["profile"]["gender"]}</label>
                            <select
                                name="gender"
                                id="gender"
                                className="my-form-style"
                                {...register("gender", {required: false})}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {genders.map((value, i) => {
                                    return (
                                        <option key={i} value={value.key}>
                                            {value.label}
                                        </option>
                                    )
                                })}
                            </select>
                            {errors.gender && (<span className="-mt-1 text-[12px] text-yellow-100">{errors.gender.message}</span>)}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row mt-4">
                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="contactNumber" className="my-form-label">{appLocale["profile"]["contactNumber"]}</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder={appLocale["profile"]["contactNumberPlaceholder"]}
                                className="my-form-style"
                                {...register("contactNumber", {
                                    required: {
                                        value: false,
                                        message: "Please enter your Contact Number.",
                                    },
                                    maxLength: {value: 12, message: "Invalid Contact Number"},
                                    minLength: {value: 6, message: "Invalid Contact Number"},
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />
                            {errors.contactNumber && (<span className="my-form-style-error">{errors.contactNumber.message}</span>)}
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[50%]">
                            <label htmlFor="about" className="my-form-label">{appLocale["profile"]["about"]}</label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="my-form-style"
                                {...register("about", {required: false})}
                                defaultValue={user?.additionalDetails?.about}
                            />
                            {errors.about && (<span className="my-form-style-error">{appLocale["profile"]["aboutPlaceholder"]}</span>)}
                        </div>
                    </div>

                    <div className="flex justify-end gap-5 mt-4">
                        {/*<button*/}
                        {/*    onClick={() => {*/}
                        {/*        navigate("/dashboard/my-profile")*/}
                        {/*    }}*/}
                        {/*    className="my-btn-cancel"*/}
                        {/*>*/}
                        {/*    Cancel*/}
                        {/*</button>*/}
                        <button type={"submit"} className={"my-btn-confirm"}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}