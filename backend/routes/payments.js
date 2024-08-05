//
//
const router = require('express').Router()

const { capturePayment, verifyPayment } = require('../controller/payments')
const { auth, isAdmin, isInstructor, isStudent } = require('../middleware/auth')

router.post('/capturePayment', auth, isStudent, capturePayment)
router.post('/verifyPayment', auth, isStudent, verifyPayment)

module.exports = router
