const express = require('express');
const { handleGenerateNewURL , handleAnalytics } = require('../controllers/url_controller');

const router = express.Router();

router.post('/' , handleGenerateNewURL);
router.get('/analytics/:id' , handleAnalytics);


module.exports = router;
