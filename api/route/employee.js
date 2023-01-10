const express = require('express');
const { review, fetchPerformance, record, submitReview, checkReview } = require('../controller/employeeController');
const router = express.Router();

router.get('/review', review);
router.post('/record', record);
router.post('/fetchPerformance', fetchPerformance);
router.post('/submitReview', submitReview);
router.post('/checkReview', checkReview);

module.exports = router;