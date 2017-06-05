var express = require('express');
var router = express.Router();
var request = require('request');
var token_helper = require('../util/token_helper');
var db = require('../util/db.js');


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
.get(function(req, res, next) {
	var sql = 'select * from picture';
	db.do_query('sql', function(result) {
		res.send(result);
	})
})
.post(function(req, res, next) {
	res.sendStatus(401);
});

router.route('/:id')
.put(function(req, res, next) {
	var pic_id = req.params.id;
	res.send(pic_id);
})
.delete(function(req, res, next) {
	var pic_id = req.params.id;
	var sql = 'delete from picture where picture_id = ' + pic_id;
	db.do_query(sql, function(result) {});
	res.sendStatus(200);
});

module.exports = router;
