var express = require('express');
var userRouteProtected = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');
var _ = require('lodash');

// User's personal information ~
// Send GET to baseUrl + /api/user
// Overtaken by the auth endpoint
userRouteProtected.route("/")
    .get(function (req, res) {
        User.findById(req.user._doc._id)
            .populate("messages.from")
            .populate("tradeItems")
            .exec(function (err, foundUser) {
                if (err) res.status(500).send(err);
                res.send(foundUser);
            });
    });

// User's personal trade items
userRouteProtected.route("/items")
    // GET all posted items ~ (check for populated fields)
    // overtaken by the auth route GET
    .get(function (req, res) {
        Item.find({
                owner: req.user._doc._id
            })
            .populate("offers.from")
            .populate("offers.willTradeFor")
            .exec(function (err, foundItems) {
                if (err) res.status(500).send(err);
                res.send(foundItems);
            });
    })
    // POST new trade items ~
    // POST to (baseUrl + /api/user/items, { name: "shoes", description: "old shoes", etc })
    .post(function (req, res) {
        User.findOne({
            _id: req.user._doc._id
        }, function (err, foundUser) {

            if (err) {
                res.status(500).send(err);
            } else {
                var newItem = new Item(req.body);
                newItem.owner = req.user._doc._id;
                newItem.save(function (err, savedItem) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        foundUser.tradeItems.push(savedItem._id);
                        foundUser.save(function (err, savedUser) {
                            if (err) res.status(500).send(err);
                            res.send(savedItem);
                        });
                    }
                });
            }
        });
    });

userRouteProtected.route("/items/:itemId")
    // GET a single item by ID to api/user/items/:itemId ~ (check populated fields)
    // :itemId is the _id corresponding to the Item collection
    .get(function (req, res) {
        Item.find({
                _id: req.params.itemId,
                owner: req.user._doc._id
            })
            .populate("offers.from")
            .populate("offers.willTradeFor")
            .exec(function (err, foundItem) {
                if (err) res.status(500).send(err);
                res.send(foundItem);
            });
    })
    // PUT an update on existing items api/user/items/:itemId with minimum object { name: "", description: "" } ~
    // :itemId is the _id corresponding to the Item collection
    .put(function (req, res) {
        User.findById(req.user._doc._id, function (err, foundUser) {
            if (err) {
                res.status(500).send(err);
            } else {
                Item.findOneAndUpdate({
                        _id: req.params.itemId,
                        owner: foundUser._id
                    }, req.body, {
                        new: true
                    },
                    function (err, updatedItem) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            var index = foundUser.tradeItems.indexOf(req.params.itemId);
                            if (index === -1) {
                                res.status(500).send("User does not have the item listed.");
                            } else {
                                foundUser.tradeItems.splice(index, 1, updatedItem);
                                foundUser.save(function (err, savedUser) {
                                    if (err) res.status(500).send(err);
                                    res.send(updatedItem);
                                });
                            }
                        }
                    });
            }
        });

    })
    // DELETE a single item to api/user/items/:itemId ~
    // :itemId is the _id corresponding to the Item collection
    .delete(function (req, res) {
        User.findById(req.user._doc._id, function (err, foundUser) {
            if (err) {
                res.status(500).send(err);
            } else {
                Item.findOneAndRemove({
                    _id: req.params.itemId,
                    owner: req.user._doc._id
                }, function (err, deletedItem) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        _.remove(foundUser.tradeItems, function (n) {
                            return n === deletedItem; //?
                        });
                        res.send(deletedItem);
                    }
                });
            }
        });
    });

userRouteProtected.route("/messages")
    // POST to (baseUrl + api/user/messages with message object { to: receiverId, content: "I want that" }) ~
    .post(function (req, res) {
        var message = req.body;
        message.from = req.user._doc._id;
        User.findOne({
            _id: req.body.to
        }, function (err, foundUser) {
            if (err) {
                res.status(500).send(err);
            } else {
                foundUser.messages.push(message);
                foundUser.save(function (err, savedUser) {
                    if (err) res.status(500).send(err);
                    res.send(message);
                });
            }
        });
    })
    // DELETE to api/user/messages with message object { content: "I want that" }
    // It's not ideal, but it's checking the array of messages by its content
    .delete(function (req, res) {
        User.findOneById(req.user._doc._id, function (err, foundUser) {
            if (err) {
                res.status(500).send(err);
            } else {
                for (var index of foundUser.messages) {
                    if (index.content === req.body.content) {
                        var deletedItem = foundUser.messages[index];
                        foundUser.messages.splice(index, 1);
                    }
                }
                foundUser.save(function (err, savedUser) {
                    if (err) res.status(500).send(err);
                    res.send(deletedItem);
                });
            }
        });
    });

// User's personal information


module.exports = userRouteProtected;