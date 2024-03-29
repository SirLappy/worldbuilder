var express = require('express');
var router = express.Router();
var models = require('../models/worldbuilder');
 
var entity = models.getEntity();

//todo: default home page will show a map, and user will be able to associate locations with points on that map.
//for now though, just list locations as default.
router.get('/api/entities', function(req, res) {
	// use mongoose to get all entities in the database
	entity.find(function(err, entities) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			res.send(err)
		}

		res.json(entities); // return all entities in JSON format
	});
});

router.get('/api/entity:entity_id', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		console.log(docs);
		res.status(200).json(docs);
	});
});

// create entity and send back all locations after creation
router.post('/api/entity', function(req, res) {
	// create a todo, information comes from AJAX request from Angular
	
	entity.create({
		name : req.body.name,
		description: req.body.description
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}
		
		// use mongoose to get all entities in the database
		entity.find(function(err, entities) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				res.send(err)
			}

			res.json(entities); // return all entities in JSON format
		});
	});
});

// delete an entity
router.delete('/api/entity/:entity_id', function(req, res) {
	entity.remove({
		_id : req.params.entity_id
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}
		
		// use mongoose to get all entities in the database
		entity.find(function(err, entities) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				res.send(err)
			}

			res.json(entities); // return all entities in JSON format
		});
	});
});

router.get('*', function(req, res) {
	res.render('pages/builder'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;