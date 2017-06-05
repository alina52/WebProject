

var token = {};
var token_str = "3nmfe4k0a41tfdzmo0k3";
token.getToken = function () {
	return token_str;
}

token.validate = function(getToken) {
	if (getToken == token_str)
		return true;
	else
		return false;
}

module.exports = token;
