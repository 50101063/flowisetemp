const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// Route for registering users
router.post('/register', authController.register);

// Route for login users
router.post('/login', authController.login);

module.exports = router;
