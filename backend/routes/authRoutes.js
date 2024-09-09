const express = require('express');
const { registerUser, loginUser, logoutUser,verifyUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/verify', authMiddleware, verifyUser);

module.exports = router;
