const express = require('express');
const { signupEmp } = require('../controller/signupController');
const router = express.Router();

router.post('/Emp', signupEmp)
   
module.exports = router;