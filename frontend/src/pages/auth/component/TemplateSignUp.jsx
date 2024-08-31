import LogoLinxEdu from "../../../assets/linxedu/logo-linxedu.png";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {ACCOUNT_TYPE} from "../../../utils/constants.js";
import {http_signup} from "../../../services/operations/authAPI"
import {getOtp} from "../../../utils/utils.js";
import toast from "react-hot-toast";
import {getRouterPath, PathLogin} from "../../../services/router.js";
import {TabSwitch} from "../../../components/base";
import {useTranslation} from "react-i18next";

function TemplateSignUp({title}) {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {firstName, lastName, email, password, confirmPassword} = formData
    const [apiResponse, setApiResponse] = useState({status: true, msg: ""});
    const [loading, setLoading] = useState(false);

    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
        // console.log('signup form data - ', formData)
    }
    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }

        setApiResponse({status: true, msg: ""});
        setLoading(true);

        // instead, send directly signup
        const otp = getOtp(6)
        dispatch(http_signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate)).then(response => {
            setLoading(false);
            setApiResponse({...response});
            if (response.status) {
                navigate(getRouterPath(PathLogin))
            }
        });
    }

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]
    return (
        <div className="h-screen place-items-center">
            <div className="grid grid-cols-1 h-full">
                <div className="flex flex-col items-center justify-center p-4">
                    <img
                        src={LogoLinxEdu}
                        alt={""}
                        className={'max-h-[90px]'}
                    />
                    <div className="text-[1.6rem] md:text-[1.7rem] font-bold text-center mt-3">{t('byCreator')}</div>
                    <div className="text-[1.8rem] md:text-[2.0rem] font-bold text-center mt-3 text-app-primary">{title}</div>
                    <div className="max-w-[450px] md:mx-0">
                        <TabSwitch tabData={tabData} field={accountType} setField={setAccountType}/>
                        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
                            {/* First Name */}
                            <div className="w-full">
                                <label>
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
                                        First Name <sup className="text-app-error">*</sup>
                                    </p>
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleOnChange}
                                        placeholder="Enter first name"
                                        className="input input-md w-full rounded-[1.0rem] outline-none input-bordered text-lg"
                                    />
                                </label>
                            </div>
                            {/* Last Name */}
                            <div className="w-full">
                                <label>
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
                                        Last Name <sup className="text-app-error">*</sup>
                                    </p>
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleOnChange}
                                        placeholder="Enter last name"
                                        className="input input-md w-full rounded-[1.0rem] outline-none input-bordered text-lg"
                                    />
                                </label>
                            </div>

                            {/* Email Address */}
                            <div className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
                                    Email Address <sup className="text-app-error">*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleOnChange}
                                    placeholder="Enter email address"
                                    className="input input-md w-full rounded-[1.0rem] outline-none input-bordered text-lg"
                                />
                            </div>

                            {/* Create Password */}
                            <div className="flex gap-x-4">
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
                                        Create Password <sup className="text-app-error">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder="Enter Password"
                                        className="input input-md w-full rounded-[1.0rem] outline-none input-bordered text-lg"
                                    />
                                    <span onClick={() => setShowPassword((prev) => !prev)}
                                          className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                      {showPassword ? (
                                          <AiOutlineEyeInvisible fontSize={24}/>
                                      ) : (
                                          <AiOutlineEye fontSize={24}/>
                                      )}
                                    </span>
                                </label>

                                {/* Confirm Password  */}
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
                                        Confirm Password <sup className="text-app-error">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder="Confirm Password"
                                        className="input input-md w-full rounded-[1.0rem] outline-none input-bordered text-lg"
                                    />
                                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                                          className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                      {showConfirmPassword ? (
                                          <AiOutlineEyeInvisible fontSize={24}/>
                                      ) : (
                                          <AiOutlineEye fontSize={24}/>
                                      )}
                                    </span>
                                </label>
                            </div>

                            {
                                !apiResponse.status && (<div className="text-app-error text-center">{apiResponse.msg}</div>)
                            }
                            <button className="btn btn-md btn-warning rounded-[1.0rem] bg-app-base border-app-base" onClick={handleOnSubmit}>
                                {loading && <span className="loading loading-spinner mr-2"></span>}
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateSignUp
