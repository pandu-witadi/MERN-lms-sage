import {toast} from "react-hot-toast"

import {setUser} from "../../reducer/slices/profileSlice"
import {apiConnector} from "../apiConnector"
import {http_logout} from "./authAPI"
import {ApiChangePassword, ApiProfileDelete, ApiProfileUpdate, ApiProfileUpdateImage, getRouterApi} from "../router.js";

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
            return ({status: false, msg: "Could Not Update Profile"});
        }
    }
}


// ================ change Password  ================
export async function http_change_password(token, formData) {
    try {
        const response = await apiConnector("POST", getRouterApi(ApiChangePassword), formData, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            return ({status: false, msg: response.data.message});
        }
        return ({status: true, msg: ""});
    } catch (error) {
        return ({status: false, msg: error.response.data.message});
    }
}

// ================ delete Profile ================
export function http_profile_delete(token, navigate) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("DELETE", getRouterApi(ApiProfileDelete), null, {
                Authorization: `Bearer ${token}`,
            })

            if (!response.data.success) {
                return ({status: false, msg: response.data.message});
            }
            dispatch(http_logout(navigate))
        } catch (error) {
            toast.error("Could Not Delete Profile")
        }
    }
}