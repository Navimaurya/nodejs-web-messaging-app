const globalErrorController = require('./controller/errorController'); // Global Error controller
const AppError = require("./utils/appError");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('path');
const express =  require('express');
dotenv.config({ path: "./config.env" });
require('./supports/database').database();
const messageApp = require('./messageApp');


//Starting Express app
const server = express();

//Setting view engine for web
server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded({extended: true}));
server.set('view engine', 'ejs');

//message app API module
server.use(messageApp)

//Adding Globule Error handler
server.use(globalErrorController);

//Starting server
server.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log("Server is started! in %s", process.env.ENV )
    console.log(`link is http://localhost:${process.env.PORT}`);
})