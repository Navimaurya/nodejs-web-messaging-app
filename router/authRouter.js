const authController = require('./../controller/authController');
const xp = require('express');
const router = xp.Router();

//Unprotected routs
router.post('/login', authController.login)
    .post('/signup', authController.signup);


module.exports = router;

