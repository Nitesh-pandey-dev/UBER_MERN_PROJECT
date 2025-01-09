var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const { register, login, profile, logout } = require('../controllers/user.controller');
const check = require('../middlewares/auth');

/* GET users listing. */
router.post('/register',register);
router.post('/login',[
    body('email').isEmail().withMessage("Invalid email id!!")
],login)
router.get('/profile',check,profile)
router.get('/logout',check,logout)

module.exports = router;
