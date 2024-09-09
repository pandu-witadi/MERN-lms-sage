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
export const ApiCourseCategories = "ApiCourseCategories";
export const ApiCourseAdd = "ApiCourseAdd";
export const ApiCourseEdit = "ApiCourseEdit";
export const ApiCourseDelete = "ApiCourseDelete";
export const ApiCourseDetails = "ApiCourseDetails";
export const ApiInstructorCourses = "ApiInstructorCourses";
export const ApiSectionAdd = "ApiSectionAdd";
export const ApiSectionUpdate = "ApiSectionUpdate";
export const ApiSectionDelete = "ApiSectionDelete";
export const ApiSubSectionAdd = "ApiSubSectionAdd";
export const ApiSubSectionUpdate = "ApiSubSectionUpdate";
export const ApiSubSectionDelete = "ApiSubSectionDelete";

export function getRouterApi(key, param = {}) {
    let routers = {
        [ApiLogin]: APP_BASE_URL + "/auth/login",
        [ApiSignUp]: APP_BASE_URL + "/auth/signup",
        [ApiChangePassword]: APP_BASE_URL + "/auth/change-password",
        [ApiProfileGet]: APP_BASE_URL + "/profile/getUserDetails",
        [ApiProfileUpdate]: APP_BASE_URL + "/profile/updateProfile",
        [ApiProfileUpdateImage]: APP_BASE_URL + "/profile/updateUserProfileImage",
        [ApiProfileDelete]: APP_BASE_URL + "/profile/deleteProfile",
        [ApiProfileCourses]: APP_BASE_URL + "/profile/getEnrolledCourses",
        [ApiProfileInstructorData]: APP_BASE_URL + "/profile/instructorDashboard",
        [ApiCourseCategories]: APP_BASE_URL + "/course/showAllCategories",
        [ApiCourseAdd]: APP_BASE_URL + "/course/createCourse",
        [ApiCourseEdit]: APP_BASE_URL + "/course/editCourse",
        [ApiCourseDelete]: APP_BASE_URL + "/course/deleteCourse",
        [ApiCourseDetails]: APP_BASE_URL + "/course/getFullCourseDetails",
        [ApiInstructorCourses]: APP_BASE_URL + "/course/getInstructorCourses",
        [ApiSectionAdd]: APP_BASE_URL + "/course/addSection",
        [ApiSectionUpdate]: APP_BASE_URL + "/course/updateSection",
        [ApiSectionDelete]: APP_BASE_URL + "/course/deleteSection",
        [ApiSubSectionAdd]: APP_BASE_URL + "/course/addSubSection",
        [ApiSubSectionUpdate]: APP_BASE_URL + "/course/updateSubSection",
        [ApiSubSectionDelete]: APP_BASE_URL + "/course/deleteSubSection",
    }
    return (routers[key]);
}

export const StepForm = "form";
export const StepBuilder = "builder";
export const StepPublish = "publish";

export const PathRoot = "PathRoot";
export const PathLogin = "PathLogin";
export const PathSignUp = "PathSignUp";
export const PathSettings = "PathSettings";
export const PathProfile = "PathProfile";
export const PathNotifications = "PathNotifications";
export const PathCourseAdd = "PathCourseAdd";
export const PathCourseEdit = "PathCourseEdit"; // [form, builder, publish]

export function getRouterPath(key, prefix = "/", param = {}) {
    let routers = {
        [PathRoot]: prefix,
        [PathLogin]: prefix + "login",
        [PathSignUp]: prefix + "signup",
        [PathSettings]: prefix + "settings",
        [PathProfile]: prefix + "profile",
        [PathNotifications]: prefix + "notifications",
        [PathCourseAdd]: prefix + "course-add",
        [PathCourseEdit]: prefix + "course-edit/" + (("courseId" in param) ? `${param["courseId"]}` : ":courseId") +
        (("stepMode" in param) ? `/${param["stepMode"]}` : "/:stepMode"),
    }
    return (routers[key]);
}
