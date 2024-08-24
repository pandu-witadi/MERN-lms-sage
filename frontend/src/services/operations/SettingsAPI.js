import {toast} from "react-hot-toast"

import {setUser} from "../../reducer/slices/profileSlice"
import {apiConnector} from "../apiConnector"
import {settingsEndpoints} from "../apis"
import {http_logout} from "./authAPI"
import {ApiProfileUpdate, ApiProfileUpdateImage, getRouterApi} from "../router.js";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints


// ================ update User Profile Image  ================
export function http_profile_update_image(token, formData) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("PUT", getRouterApi(ApiProfileUpdateImage), formData, {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )

            if (!response.data.success) {
                return ({status: false, msg: response.data.message});
            }
            dispatch(setUser(response.data.data));

            // below line is must - if not code - then as we refresh the page after changing profile image then old profile image will show
            // as we only changes in user(store) not in localStorage
            localStorage.setItem("user", JSON.stringify(response.data.data));
            return ({status: true, msg: ""});
        } catch (error) {
            return ({status: false, msg: "Could Not Update Profile Picture"});
        }
    }
}

// ================ update Profile  ================
export function http_profile_update(token, formData) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("PUT", getRouterApi(ApiProfileUpdate), formData, {
                Authorization: `Bearer ${token}`,
            })

            if (!response.data.success) {
                return ({status: false, msg: response.data.message});
            }
            dispatch(setUser(response.data.data));

            localStorage.setItem("user", JSON.stringify(response.data.data));
            return ({status: true, msg: ""});
        } catch (error) {
            console.log(error)
            return ({status: false, msg: "Could Not Update Profile"});
        }
    }
}


// ================ change Password  ================
export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Password Changed Successfully")
    } catch (error) {
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

// ================ delete Profile ================
export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`,
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(http_logout(navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}