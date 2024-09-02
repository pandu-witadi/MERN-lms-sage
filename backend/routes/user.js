const router = require('express').Router()

// controller
const {
    signup,
    login,
    changePassword
} = require('../controller/auth')

// Reset password controller
const {
    resetPasswordToken,
    resetPassword,
} = require('../controller/resetPassword')


// Middleware
const { auth } = require('../middleware/auth')


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user signup
router.post('/signup', signup)

// Route for user login
router.post('/login', login)

// Route for Changing the password
router.post('/change-password', auth, changePassword)



// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post('/reset-password-token', resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


module.exports = router
