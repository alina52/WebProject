var express = require('express');
var router = express.Router();
var request = require('request');
var token_helper = require('../util/token_helper');
var db = require('../util/db.js');




router.route('/')
.get(function(req, res, next) {
	var sql = 'select * from picture';
	db.do_query(sql, function(result) {
		for (var index = 0; index < result.length; index++) {
			var tags = [];
			tags = result[index]['tag'].split(',');
			result[index]['tag'] = tags;
		}
		res.send({'pictures': result});
	})
})

router.route('/:id')
.get(function (req, res, next) {
	var id = req.params.id;
	var sql = 'select * from picture where picture_id = ' + id;
	db.do_query(sql, function(result) {
		if (result !== null && result.length > 0)
			res.send(result[0]);
		else
			res.sendStatus(500);
	})
})

router.route('/*')
.all(function(req, res, next) {
	var token = req.query['token'];
	if (token == undefined)
		res.sendStatus(403);
	else {
		if (!token_helper.validate(token))
			res.sendStatus(401);
		else {
			next();
		}
	}
});

router.route('/')
.post(function(req, res, next) {

	var sql = 'insert into picture (name, description, date, tag, path) values(\'' + req.body['name'] + '\', \'';
	sql += req.body['description'] + '\', \'' + req.body['date'] + '\', \'' + req.body['tag'] + '\', \'' + req.body['path'];
	sql += '\');';
	console.log(sql);
	db.do_query(sql, function() {});
	res.sendStatus(201);
});

router.route('/:id')
.put(function(req, res, next) {
	var pic_id = req.params.id;
	var tags = "";
	for (var index = 0; index < req.body['tag'].length; index++) {
		tags += req.body['tag'][index];
		if (index != req.body['tag'].length - 1)
			tags += ",";
	}
	req.body['tag'] = tags;

	var sql = "update picture set name = \'" + req.body['name'] + "\', description = \'" + req.body['description'];
	sql += "\', tag = \'" + req.body['tag'] + "\', date = \'" + req.body['date'] + "\'";
	sql += " where picture_id = " + pic_id;
	db.do_query(sql, function() {});
	res.sendStatus(200);
})
.delete(function(req, res, next) {
	var pic_id = req.params.id;
	var sql = 'delete from picture where picture_id = ' + pic_id;
	db.do_query(sql, function(result) {});
	res.sendStatus(200);
});

module.exports = router;
