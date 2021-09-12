require('path')
const express = require('express');
const sanitize = require('express-mongo-sanitize');
const  cookieParser = require('cookie-parser')
const mainRouter = require('./router/mainRouter')
const  AppError = require('./utils/appError');

const app = express()

//Sanitising mongoose queries
app.use(sanitize());
//Parsing BOdy data in JSON
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(mainRouter);

app.all("*", function (req, res, next) {
    return next(new AppError("Sorry we did not find your page!", 404));
});

module.exports = app;