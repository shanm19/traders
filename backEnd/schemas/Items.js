var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('./Users').Schema;

var ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    offers: [{
        from: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        willTradeFor: {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    }],
    willTradeFor: String,
    datePosted: Date,
    category: {
        type: String,
        required: true,
        enum: ['entertainment', 'auto', 'clothing', 'furniture', 'books', 'textbooks', 'movies', 'holiday', 'toys', 'baby', 'toddler', 'boardgames', 'services', 'technology', 'other']
    },
    imgUrl: String
});

module.exports = mongoose.model('Item', ItemSchema);