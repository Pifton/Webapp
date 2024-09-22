const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/users', userController.verifyToken, userController.titlePatissier, userController.getAllUsers);
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

module.exports = router;