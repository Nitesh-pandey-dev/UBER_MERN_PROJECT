const express = require('express');
const { register, login, profile, logout } = require('../controllers/captain.controller');
const check2 = require('../middlewares/auth2');
const upload = require('../middlewares/multer');
const router = express.Router();
router.post('/register',upload.single('image'),register)
router.post('/login',login)
router.get('/profile',check2,profile)
router.get('/logout',check2,logout)
module.exports = router;