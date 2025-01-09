const express = require('express');
const { getAddress, getDistance, getSuggestions, fares } = require('../controllers/maps.controller');
const getFare = require('../middlewares/getFare');
const router = express.Router();
router.get('/getltdlng',getAddress)
router.get('/getdistance',getDistance)
router.get('/getsuggestion',getSuggestions)
router.get('/getfares',getFare,fares)
module.exports = router;