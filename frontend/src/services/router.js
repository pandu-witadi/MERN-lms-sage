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
const PathUserDashboard = "PathUserDashboard";

const PathInstructorDashboard = "PathInstructorDashboard";
function getRouterPath(key, prefix = "/", param = {}) {
    let routers = {
        [PathLogin]: prefix + "login",
        [PathSignUp]: prefix + "signup",
        [PathUserDashboard]: prefix + "dashboard",
        [PathInstructorDashboard]: prefix + "dashboard"
    }
    return (routers[key]);
}

function getDashboardPage(userType="Student") {
    // ['Admin', 'Instructor', 'Student']
    if(userType === ACCOUNT_TYPE.INSTRUCTOR) {
        return(getRouterPath(PathUserDashboard));
    }
    else {
        return(getRouterPath(PathUserDashboard));
    }
}
export {
    ApiLogin,
    ApiSignUp,
    PathLogin,
    PathSignUp,
    PathUserDashboard,
    PathInstructorDashboard,
    getRouterApi, getRouterPath, getDashboardPage
}