//
//
const router = require('express').Router()

const { test_get } = require("../controller/test")
router.get('/', test_get)


module.exports = router
