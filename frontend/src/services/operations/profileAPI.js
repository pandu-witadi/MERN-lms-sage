import {toast} from "react-hot-toast"

import {setLoading, setUser} from "../../reducer/slices/profileSlice"
import {apiConnector} from "../apiConnector"
import {profileEndpoints} from "../apis"
import {http_logout} from "./authAPI"
import {ApiProfileGet, getRouterApi} from "../router.js";

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints


// ================ get User Details  ================
export function http_get_profile(token, navigate) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("GET", getRouterApi(ApiProfileGet), null,
                {Authorization: `Bearer ${token}`,})
            if (!response.data.success) {
                return ({status: false, msg: response.data.message});
            }
            dispatch(setUser({...response.data.data}));
            return ({status: true, msg: ""});
        } catch (error) {
            dispatch(http_logout(navigate));
            return ({status: false, msg: "Could Not Get User Details"});
        }
    }
}

// ================ get User Enrolled Courses  ================
export async function getUserEnrolledCourses(token) {
    // const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, {token}, {Authorization: `Bearer ${token}`,})

        console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    // toast.dismiss(toastId)
    return result
}

// ================ get Instructor Data  ================
export async function getInstructorData(token) {
    // const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
        result = response?.data?.courses
    } catch (error) {
        console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
        toast.error("Could Not Get Instructor Data")
    }
    // toast.dismiss(toastId)
    return result
}
