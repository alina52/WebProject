var express = require('express');
var router = express.Router();
var request = require('request');
var token_helper = require('../util/token_helper');

router.route('/login')
.post(function(req, res, next) {
	var username = req.body['username'],
		password = req.body['password'];
	if (username == "Wang" && password == "1234") {
		res.send(token_helper.getToken());
	} else {
		res.sendStatus(401);
	}
});

module.exports = router;
