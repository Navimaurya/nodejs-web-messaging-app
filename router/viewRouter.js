const express = require('express');
const authController = require('./../controller/authController');
const viewController = require('./../controller/viewController');
const app = express();

// app.get('/login', (req, res) =>{
// //     res.status(200).render('v0/login');
// // });
app.get('/',(req, res)=>{
    res.status(200).render('v0/index')
});
// app.use(authController.isloggedIn);
app.get('/web', authController.isloggedIn, viewController.indexPage);



module.exports = app;