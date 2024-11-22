const express = require('express');
const { addLog, getLogs } = require('../controllers/logController');


const router = express.Router();

router.post('/addlogs', addLog);
router.get('/getlogs', getLogs);

module.exports = router;
