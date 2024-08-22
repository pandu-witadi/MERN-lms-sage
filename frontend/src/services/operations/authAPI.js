//
//
import {toast} from "react-hot-toast"

import {setLoading, setToken} from "../../reducer/slices/authSlice"
import {resetCart} from "../../reducer/slices/cartSlice"
import {setUser} from "../../reducer/slices/profileSlice"
import {apiConnector} from "../apiConnector"
import {endpoints} from "../apis"
import {ApiLogin, ApiSignUp, getRouterApi} from "../router.js";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

// ================ send Otp ================
export function sendOtp(email, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      // console.log("SENDOTP API RESPONSE ---> ", response)

      // console.log(response.data.success)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      navigate("/verify-email")
      toast.success("OTP Sent Successfully")
    } catch (error) {
      console.log("SENDOTP API ERROR --> ", error)
      toast.error(error.response.data?.message)
      // toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// ================ sign Up ================
export function http_signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", getRouterApi(ApiSignUp), {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      if (!response.data.success) {
        return ({status: false, msg: response.data.message});
      }

      return ({status: true, msg: ""});
    } catch (error) {
      toast.error(error.message)
      return ({status: false, msg: error.message});
    }
  }
}


// ================ Login ================
export function http_login(email, password) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", getRouterApi(ApiLogin), {
        email,
        password,
      })

      if (!response.data.success) {
        return ({status: false, msg: response.data.message});
      }

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setToken(response.data.token))
      dispatch(setUser({...response.data.user, image: userImage}))
      localStorage.setItem("token", JSON.stringify(response.data?.token))
      localStorage.setItem("user", JSON.stringify({...response.data.user, image: userImage}))
      return ({status: true, msg: ""});
    } catch (error) {
      toast.error(error.message)
      return ({status: false, msg: error.message});
    }
  }
}


// ================ get Password Reset Token ================
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})

      console.log("RESET PASS TOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESET PASS TOKEN ERROR............", error)
      toast.error(error.response?.data?.message)
      // toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


// ================ reset Password ================
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error(error.response?.data?.message)
      // toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


// ================ Logout ================
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
