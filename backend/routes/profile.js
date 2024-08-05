//
//
const router = require('express').Router()

const { auth, isInstructor } = require("../middleware/auth")

// controller
const {
    updateProfile,
    updateUserProfileImage,
    getUserDetails,
    getEnrolledCourses,
    deleteAccount,
    instructorDashboard
} = require('../controller/profile')


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete('/deleteProfile', auth, deleteAccount)
router.put('/updateProfile', auth, updateProfile)
router.get('/getUserDetails', auth, getUserDetails)


// Get Enrolled Courses
router.get('/getEnrolledCourses', auth, getEnrolledCourses)

// update profile image
router.put('/updateUserProfileImage', auth, updateUserProfileImage)

// instructor Dashboard Details
router.get('/instructorDashboard', auth, isInstructor, instructorDashboard)



module.exports = router;
