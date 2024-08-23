import {ACCOUNT_TYPE} from "../utils/constants.js";

const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL

const ApiLogin = "ApiLogin";
const ApiSignUp = "ApiSignUp";
function getRouterApi(key, param = {}) {
    let routers = {
        [ApiLogin]: APP_BASE_URL + "/auth/login",
        [ApiSignUp]: APP_BASE_URL + "/auth/signup"
    }
    return (routers[key]);
}

const PathLogin = "PathLogin";
const PathSignUp = "PathSignUp";
const PathDashboard = "PathDashboard";
const PathSettings = "PathSettings";
const PathProfile = "PathProfile";
const PathInstructorCourses = "PathInstructorCourses";
const PathInstructorAddCourses = "PathInstructorAddCourses";

function getRouterPath(key, prefix = "/", param = {}) {
    let routers = {
        [PathLogin]: prefix + "login",
        [PathSignUp]: prefix + "signup",
        [PathDashboard]: prefix + "dashboard",
        [PathSettings]: prefix + "settings",
        [PathProfile]: prefix + "profile",
        [PathInstructorCourses]: prefix + "courses",
        [PathInstructorAddCourses]: prefix + "courses-add",
    }
    return (routers[key]);
}

export {
    ApiLogin,
    ApiSignUp,
    PathLogin,
    PathSignUp,
    PathDashboard,
    PathSettings,
    PathProfile,
    PathInstructorCourses,
    PathInstructorAddCourses,
    getRouterApi, getRouterPath
}