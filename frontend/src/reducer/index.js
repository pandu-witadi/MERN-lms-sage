import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "./slices/authSlice"
import courseReducer from "./slices/courseSlice"
import viewCourseReducer from "./slices/viewCourseSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  viewCourse: viewCourseReducer,
})

export default rootReducer
