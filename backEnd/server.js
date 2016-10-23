var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var jwt = require('express-jwt');

var Items = require('./schemas/Items');
var Users = require('./schemas/Users');

var userRoute = require('./routes/userRoute');
var userRouteProtected = require('./routes/userRouteProtected');
var itemRoute = require('./routes/itemRoute');
var itemRouteProtected = require('./routes/itemRouteProtected');
var authRoute = require('./routes/authRoute');

var port = process.env.PORT || 8080;

mongoose.connect(config.database, function () {
    console.log("Mongoose on the DB");
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', jwt({
    secret: config.secret
}));

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/api/user', userRouteProtected);
app.use('/item', itemRoute);
app.use('/api/item', itemRouteProtected);


app.use(express.static(path.join(__dirname, "frontEnd")));

app.listen(port, function () {
    console.log("You have reached port " + port);
});