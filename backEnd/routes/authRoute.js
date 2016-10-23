var express = require('express');
var authRoute = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../schemas/Users');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// send POST to (baseUrl + /auth/signup, { firstName: "John", lastName: "Smith", username: "johnjohn", password: "1234" })
authRoute.post("/signup", function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function (err, savedUser) {
        if (err) res.status(500).send(err);
        res.send(savedUser);
    });
});

// send POST to (baseUrl + /auth/login, { username: "johnjohn", password: "1234" })
authRoute.post("/login", function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, foundUser) {
        if (err) res.status(500).send(err);
        if (!foundUser) {
            res.status(401).send({
                success: false,
                message: "The username you entered does not exist"
            });
        } else if (foundUser) {
            bcrypt.compare(foundUser.password, req.body.password, function (err, isMatch) {

                foundUser.comparePasswords(req.body.password, function (err, isMatch) {

                    if (!isMatch) {
                        res.status(401).send({
                            success: false,
                            message: "Incorrect password"
                        });
                    } else {
                        var token = jwt.sign(foundUser, config.secret, {
                            expiresIn: "24h"
                        });
                        res.send({
                            success: true,
                            token: token,
                            user: foundUser.removePassword(),
                            message: "Here is your token!"
                        });
                    }

                });
            });
        }
    });
});

module.exports = authRoute;