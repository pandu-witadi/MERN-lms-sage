import {apiConnector} from "../apiConnector"
import {http_logout} from "./authAPI"
import {ApiProfileCourses, ApiProfileGet, ApiProfileInstructorData, getRouterApi} from "../router.js";
import {setUser} from "../../reducer/slices/authSlice.js";


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
export async function http_get_courses(token) {
    let result = []
    try {
        const response = await apiConnector("GET", getRouterApi(ApiProfileCourses),
            {token}, {Authorization: `Bearer ${token}`,})

        if (!response.data.success) {
            return ({status: false, msg: response.data.message});
        }
        return ({status: true, msg: response.data.data});
    } catch (error) {
        return ({status: false, msg: "Could Not Get Enrolled Courses"});
    }
}

// ================ get Instructor Data  ================
export async function http_get_instructor_data(token) {
    let result = []
    try {
        const response = await apiConnector("GET", getRouterApi(ApiProfileInstructorData),
            null, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            return ({status: false, msg: response.data.message});
        }

        return ({status: true, msg: response?.data?.courses});
    } catch (error) {
        return ({status: false, msg: "Could Not Get Instructor Data"})
    }
}
