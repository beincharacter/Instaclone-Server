const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const RegisterationRoute = require('./Routes/Registeration');
const LoginRoute = require('./Routes/Login');
const Authentication = require('./Middleware/autherization');
const PostRoute = require('./Routes/Post');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true
}))


// routes
app.use('/', RegisterationRoute);
app.use('/', LoginRoute);
app.use('/', Authentication, PostRoute);


app.get('/', (req,res) => {
    res.status(201).send("OK");
})



module.exports = app;