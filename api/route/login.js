const express = require('express');
const { loginAdmin, loginEmp } = require('../controller/loginController');
const router = express.Router();

router.post('/Employee', loginEmp)
router.post('/Admin', loginAdmin)
   
module.exports = router;