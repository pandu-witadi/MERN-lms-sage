import {ACCOUNT_TYPE} from "../utils/constants.js";

const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL

const ApiLogin = "ApiLogin";
const ApiSignUp = "ApiSignUp";
const ApiChangePassword = "ApiChangePassword";
const ApiProfileGet = "ApiProfileGet";
const ApiProfileUpdate = "ApiProfileUpdate";
const ApiProfileUpdateImage = "ApiProfileUpdateImage";
const ApiProfileDelete = "ApiProfileDelete";
function getRouterApi(key, param = {}) {
    let routers = {
        [ApiLogin]: APP_BASE_URL + "/auth/login",
        [ApiSignUp]: APP_BASE_URL + "/auth/signup",
        [ApiChangePassword]: APP_BASE_URL + "/auth/changepassword",
        [ApiProfileGet]: APP_BASE_URL + "/profile/getUserDetails",
        [ApiProfileUpdate]: APP_BASE_URL + "/profile/updateProfile",
        [ApiProfileUpdateImage]: APP_BASE_URL + "/profile/updateUserProfileImage",
        [ApiProfileDelete]: APP_BASE_URL + "/profile/deleteProfile",
    }
    return (routers[key]);
}

const PathRoot = "PathRoot";
const PathLogin = "PathLogin";
const PathSignUp = "PathSignUp";
const PathDashboard = "PathDashboard";
const PathSettings = "PathSettings";
const PathProfile = "PathProfile";
const PathNotifications = "PathNotifications";
const PathInstructorAddCourses = "PathInstructorAddCourses";

function getRouterPath(key, prefix = "/", param = {}) {
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

export {
    ApiLogin,
    ApiSignUp,
    ApiChangePassword,
    ApiProfileGet,
    ApiProfileUpdate,
    ApiProfileUpdateImage,
    ApiProfileDelete,
    PathRoot,
    PathLogin,
    PathSignUp,
    PathDashboard,
    PathSettings,
    PathProfile,
    PathNotifications,
    PathInstructorAddCourses,
    getRouterApi, getRouterPath
}