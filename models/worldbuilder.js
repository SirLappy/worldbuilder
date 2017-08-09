var mongoose = require('mongoose');

module.exports = {
	getEntity: function () {
		return mongoose.model('Entity', entitySchema);
	},
	getUser: function () {
		return mongoose.model('User', entitySchema);
	},
	getWorld: function () {
		return mongoose.model('World', entitySchema);
	}
};

var Schema = mongoose.Schema;

var entitySchema = new Schema({
	id: Number,
	name: String,
	description: String,
	tags: [{
		name: String, 
		value: String
	}],
	connections: [{
		connected_entity: Number
	}],
	world: Number
});

var userSchema = new Schema({
	id: Number,
	name: String,
	password: String
});

var worldSchema = new Schema({
	id: Number,
	name: String,
	owner: Number,
	shared_with: [{
		share_user: Number
	}]
});