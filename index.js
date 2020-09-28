const config = require('./config.js')
const mongoose = require("mongoose");
const usersRoute = require("./routes/user.routes");
const labRoute = require("./routes/lab1.routes");
const frontRoute = require("./routes/front.routes");
const express = require("express");
const logger = require("./middleware/loggers")
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');


//use config module to get the private_key, if no private key set, end the application
if (!config.private_key) {
    console.error("FATAL ERROR: private_key is not defined.");
    process.exit(1);
}


//connect to mongodb
let dbname = 'test'; // change me
const uri = "mongodb+srv://"+config.mongo_user+":"+config.mongo_pass+"@cluster0.q2ea2.gcp.mongodb.net/"+dbname+"?retryWrites=true&w=majority";

mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));

app.set("view engine", "pug");
app.use(express.json());
app.use(express.static('public'))
//app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger.pathLogger);
app.use(logger.errorLoger);
app.use("/", frontRoute);
app.use("/api/users", usersRoute);
app.use("/api/Pogonin/lab1", labRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));