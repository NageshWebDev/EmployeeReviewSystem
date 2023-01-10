const express = require('express');
const router = express.Router();

const signupRoute = require('./signup')
const loginRoute = require('./login')
const adminRoute = require('./admin')
const employeeRoute = require('./employee')

router.use("/signUp", signupRoute)
router.use("/login", loginRoute)
router.use("/admin", adminRoute)
router.use("/employee", employeeRoute)

module.exports = router;