var express = require('express');
var itemRouteProtected = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');

// This route is for accessing user-specific data
// Must be a logged in user to user this route

itemRouteProtected.route("/")
    // GET all items posted by a user
    // send GET to (baseUrl + /api/item)
    .get(function (req, res) {
        Item.find({
            owner: req.user._id
        }, function (err, items) {
            if (err) res.status(500).send(err);
            res.send(items);
        });
    })
    // POST a new item listing
    // send POST to (baseUrl + /api/item, { name: "shoes", description: "old shoes" })
    .post(function (req, res) {
        var newItem = new Item(req.body);
        newItem.save(function (err, savedItem) {
            if (err) res.status(500).send(err);
            res.send(savedItem);
        });
    });

itemRouteProtected.route("/:itemId")
    // GET one item posting and populate relevant data
    .get(function (req, res) {
        Item.findOne({
                _id: req.params.itemId,
                owner: req.user._id
            })
            .populate('offers.from')
            .populate('offers.willTradeFor')
            .exec(function (err, foundItem) {
                if (err) res.status(500).send(err);
                res.send(foundItem);
            });
    })
    // PUT an item posting
    // This will need to be updated to handle offers
    .put(function (req, res) {
        Item.findOneAndUpdate({
                _id: req.params.itemId,
                owner: req.user._id
            }, req.body, {
                new: true
            },
            function (err, updatedItem) {
                if (err) res.status(500).send(err);
                res.send(updatedItem);
            });
    })
    // DELETE an item posting
    .delete(function (req, res) {
        Item.findOneAndRemove({
            _id: req.params.itemId,
            owner: req.user._id
        }, function (err, deletedItem) {
            if (err) res.status(500).send(err);
            res.send(deletedItem);
        });
    });

module.exports = itemRouteProtected;