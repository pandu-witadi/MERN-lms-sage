import {ACCOUNT_TYPE} from "../utils/constants.js";

const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const ApiLogin = "ApiLogin";
export const ApiSignUp = "ApiSignUp";
export const ApiChangePassword = "ApiChangePassword";
export const ApiProfileGet = "ApiProfileGet";
export const ApiProfileUpdate = "ApiProfileUpdate";
export const ApiProfileUpdateImage = "ApiProfileUpdateImage";
export const ApiProfileDelete = "ApiProfileDelete";
export const ApiProfileCourses = "ApiProfileCourses";
export const ApiProfileInstructorData = "ApiProfileInstructorData";
export function getRouterApi(key, param = {}) {
    let routers = {
        [ApiLogin]: APP_BASE_URL + "/auth/login",
        [ApiSignUp]: APP_BASE_URL + "/auth/signup",
        [ApiChangePassword]: APP_BASE_URL + "/auth/changepassword",
        [ApiProfileGet]: APP_BASE_URL + "/profile/getUserDetails",
        [ApiProfileUpdate]: APP_BASE_URL + "/profile/updateProfile",
        [ApiProfileUpdateImage]: APP_BASE_URL + "/profile/updateUserProfileImage",
        [ApiProfileDelete]: APP_BASE_URL + "/profile/deleteProfile",
        [ApiProfileCourses]: APP_BASE_URL + "/profile/getEnrolledCourses",
        [ApiProfileInstructorData]: APP_BASE_URL + "/profile/instructorDashboard",
    }
    return (routers[key]);
}

export const PathRoot = "PathRoot";
export const PathLogin = "PathLogin";
export const PathSignUp = "PathSignUp";
export const PathDashboard = "PathDashboard";
export const PathSettings = "PathSettings";
export const PathProfile = "PathProfile";
export const PathNotifications = "PathNotifications";
export const PathInstructorAddCourses = "PathInstructorAddCourses";

export function getRouterPath(key, prefix = "/", param = {}) {
    let routers = {
        [PathRoot]: prefix,
        [PathLogin]: prefix + "login",
        [PathSignUp]: prefix + "signup",
        [PathDashboard]: prefix + "dashboard",
        [PathSettings]: prefix + "settings",
        [PathProfile]: prefix + "profile",
        [PathNotifications]: prefix + "notifications",
        [PathInstructorAddCourses]: prefix + "courses-add",
    }
    return (routers[key]);
}
