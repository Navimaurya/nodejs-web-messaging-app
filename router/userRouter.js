const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const express = require('express');
const router = express.Router();

//Protecting router
router.use(authController.protect);
router.get('/me', userController.getLoggedInUser)
    .get('/getfriends', userController.getFriendList);

router.post('/addcontact', userController.addContact);


module.exports = router;