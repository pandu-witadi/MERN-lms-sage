import {setUserLogin} from "../../reducer/slices/authSlice";
import {apiConnector} from "../apiConnector";
import {ApiLogin, ApiSignUp, getRouterApi, getRouterPath, PathRoot} from "../router.js";

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
      return ({status: false, msg: error.message});
    }
  }
}

// ================ Login ================


export const http_login = async (email, password) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", getRouterApi(ApiLogin), {
        email,
        password,
      })
      if (!response.data.success) {
        return ({status: false, msg: response.data.message});
      }
      dispatch(setUserLogin({token: response.data.token, user: response.data.user}));
      return ({status: true, msg: ""});
    } catch (error) {
      return ({status: false, msg: error.message});
    }
  }
}

// ================ Logout ================
export function http_logout(navigate) {
  return (dispatch) => {
    dispatch(setUserLogin({token: "", user: null}));
    navigate(getRouterPath(PathRoot));
  }
}

// // ================ get Password Reset Token ================
// export function getPasswordResetToken(email, setEmailSent) {
//   return async (dispatch) => {
//
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})
//
//       console.log("RESET PASS TOKEN RESPONSE............", response)
//
//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//
//       toast.success("Reset Email Sent")
//       setEmailSent(true)
//     } catch (error) {
//       console.log("RESET PASS TOKEN ERROR............", error)
//       toast.error(error.response?.data?.message)
//       // toast.error("Failed To Send Reset Email")
//     }
//     toast.dismiss(toastId)
//     dispatch(setLoading(false))
//   }
// }
//
//
// // ================ reset Password ================
// export function resetPassword(password, confirmPassword, token, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//
//     try {
//       const response = await apiConnector("POST", RESETPASSWORD_API, {
//         password,
//         confirmPassword,
//         token,
//       })
//
//       console.log("RESETPASSWORD RESPONSE............", response)
//
//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//
//       toast.success("Password Reset Successfully")
//       navigate("/login")
//     } catch (error) {
//       console.log("RESETPASSWORD ERROR............", error)
//       toast.error(error.response?.data?.message)
//       // toast.error("Failed To Reset Password")
//     }
//     toast.dismiss(toastId)
//     dispatch(setLoading(false))
//   }
// }
//
// // ================ send Otp ================
// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//
//     try {
//       const response = await apiConnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent: true,
//       })
//       // console.log("SENDOTP API RESPONSE ---> ", response)
//
//       // console.log(response.data.success)
//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//
//       navigate("/verify-email")
//       toast.success("OTP Sent Successfully")
//     } catch (error) {
//       console.log("SENDOTP API ERROR --> ", error)
//       toast.error(error.response.data?.message)
//       // toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }