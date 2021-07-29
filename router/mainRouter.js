const express = require('express');
const messageRouter = require('./messageApiRouter');
const authRouter = require('./authRouter');
const viewRouter = require('./viewRouter');
const userRouter = require('./userRouter');
const app = express();


//VIEW ROUTER
app.use('/', viewRouter);

//API ROUTER
app.use('/api/v0', authRouter);
app.use('/api/v0', userRouter);
app.use('/api/v0', messageRouter);


//exporting router module
module.exports = app;