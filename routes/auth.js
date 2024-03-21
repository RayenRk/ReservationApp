const express = require('express');
const { login, signup } = require('../controllers/AuthenticationController');
const validateUser = require('../middlewares/validate');
const router = express.Router();

router.post('/signup', signup, validateUser );
router.post('/login', login, validateUser );

module.exports = router;