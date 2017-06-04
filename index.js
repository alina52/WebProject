var express = require('express');
var app = express();

var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');


// 跨域访问
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , PRIVATE-TOKEN, JSON');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/', function(req,res,next){
    res.sendFile('public/welcome.html', { root: __dirname });
});

app.get('/index', function(req, res,next) {
	res.sendFile("public/index.html", { root:__dirname});
});

app.get('/welcome', function(req, res,next) {
	res.sendFile("public/html/welcome.html", { root:__dirname});
});

app.get('/picture', function(req, res,next) {
	res.sendFile("public/html/picture_list.html", { root:__dirname});
});

app.get('/game', function(req, res,next) {
	res.sendFile("public/html/memory.html", { root:__dirname});
});

app.get('/admin', function(req, res,next) {
	res.sendFile("public/admin/index.html", { root:__dirname});
});

app.use((req,res,next)=>{
    res.send("404 not found");
})

app.listen(3000);
