const express = require('express');
const { viewEmp, updateEmp, removeEmp, addPerformance, submittedPerformance, removePerformance, viewFormAndEmployee, assignPerformance, findPerformance, allPerformance } = require('../controller/adminController');
const router = express.Router();

router.get('/viewEmp', viewEmp)
router.post('/updateEmp', updateEmp)
router.post('/removeEmp', removeEmp)

router.get('/submittedPerformance', submittedPerformance)
router.get('/viewFormAndEmployee', viewFormAndEmployee)
router.get('/allPerformance', allPerformance)


router.post('/addPerformance', addPerformance)
router.post('/assignPerformance', assignPerformance)
router.post('/removePerformance', removePerformance)

router.post('/findPerformance', findPerformance)


module.exports = router;