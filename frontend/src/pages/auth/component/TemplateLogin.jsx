import {appLocale} from "../../../locale/index.js";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {login} from "../../../services/operations/authAPI.js";
import LogoLinxEdu from "../../../assets/linxedu/logo-linxedu.png";
import PeopleHomeLeft from "../../../assets/linxedu/people_home_left.png";
import PeopleHomeRight from "../../../assets/linxedu/people_home_right.png";
import LoginLeftFailed from "../../../assets/linxedu/login_left_failed.png";
import LoginRightFailed from "../../../assets/linxedu/login_right_failed.png";

function TemplateLogin({title}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [apiResponse, setApiResponse] = useState({status: true, msg: ""})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(email, password)).then(response => {
      setLoading(false);
      setApiResponse({...response, msg: appLocale["login"]["loginFailed"]});
      if (response.status) {
        // navigate("/dashboard/enrolled-courses")
      }
    })
  }

  return (
    <div className="h-screen place-items-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 h-full">
        <div className="grow-0 items-end justify-start hidden sm:flex">
          <img
            src={apiResponse.status ? PeopleHomeLeft : LoginLeftFailed}
            alt={""}
            className={'max-h-[50%]'}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={LogoLinxEdu}
            alt={""}
            className={'max-h-[100px]'}
          />
          <div className="text-[1.6rem] md:text-[1.7rem] font-bold text-center mt-3">{appLocale['byCreator']}</div>
          {
            apiResponse.status ?
              (<div className="text-[1.4rem] md:text-[1.6rem] font-semibold italic text-center mt-[30px] mb-[10px]">
                {title}
              </div>) :
              (<div className="whitespace-pre-line text-[1.0rem] md:text-[1.2rem] font-semibold text-center mt-[30px] mb-[10px] text-error">
                {apiResponse.msg}
              </div>)
          }


          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-y-4"
          >
            <label className="w-full">
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Email"
                className="input input-lg w-full rounded-[1.0rem] outline-none input-bordered text-2xl"
              />
            </label>

            <label className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Password"
                className="input input-lg w-full rounded-[1.0rem] outline-none input-bordered text-2xl"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[20px] z-[10] cursor-pointer"
              >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
          )}
        </span>
            </label>
            <div className="text-[0.9rem] md:text-[1.15rem] font-semibold text-center opacity-50 mb-4">
              {appLocale["login"]["emailInfo"]}
            </div>

            <button className="btn btn-lg btn-warning rounded-[1.0rem] bg-yellow-25 border-yellow-25" onClick={handleOnSubmit}>
              {loading && <span className="loading loading-spinner mr-2"></span>}
              Login
            </button>
          </form>
        </div>
        <div className="items-end justify-end hidden sm:flex">
          <img
            src={apiResponse.status ? PeopleHomeRight : LoginRightFailed}
            alt={""}
            className={'max-h-[50%]'}
          />
        </div>
      </div>
    </div>
  )
}

export default TemplateLogin
