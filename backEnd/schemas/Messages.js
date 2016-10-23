var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('./Users').Schema;
var ItemSchema = require('./Items').Schema;

var messageSchema = new Schema ({
	to: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	from: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	subject: String,
	content: String,
	read: false
});

module.exports = mongoose.model('Message', messageSchema);