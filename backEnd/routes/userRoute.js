var express = require('express');
var userRoute = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');

userRoute.route("/")
    // GET all users; send GET to baseUrl + /user ~
    .get(function (req, res) {
        User.find({}, {
            // restrict returned fields
            password: 0,
            messages: 0,
            friends: 0
        }, function (err, users) {
            if (err) res.status(500).send(err);
            res.send(users);
        });
    })
    // POST a new user; overtaken by token auth route ~
    .post(function (req, res) {
        var newUser = new User(req.body);
        newUser.save(function (err, savedUser) {
            if (err) res.status(500).send(err);
            res.send(savedUser);
        });
    });

userRoute.route("/search")
    // Find users by first and last name ~
    // Send GET to baseUrl + user/search?firstName=Shan&lastName=Miller
    // It can search by first name, last name, or both
    .get(function (req, res) {

        // construct object from query
        var searchObj = {};
        if (req.query.firstName) searchObj.firstName = req.query.firstName;
        if (req.query.lastName) searchObj.lastName = req.query.lastName;

        User.find(searchObj, {
            // restrict returned fields
            password: 0,
            messages: 0,
            friends: 0
        }, function (err, foundUsers) {
            if (err) res.status(500).send(err);
            res.send(foundUsers);
        });

    });


module.exports = userRoute;