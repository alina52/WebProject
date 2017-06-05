var express = require('express');
var app = express();

var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var fs = require('fs');


// 上传文件
app.post('/api/upload', function(req, res, next) {
    var form = new multiparty.Form({uploadDir: './public/picture'});

    form.parse(req, function(err, fields, files) {
        if (err) {
            res.sendStatus(500);
        } else {
            if (files.inputFiles == undefined)
                res.sendStatus(400);
            else {
                var inputFile = files.inputFiles[0];
                var uploadedPath = inputFile.path;

                var date = new Date();
                var fileName = inputFile.originalFilename,
                    finalName = date.getTime() + '.' + fileName.split('.')[1];
                var dstPath = './public/picture/' + finalName;

                fs.rename(uploadedPath, dstPath, function(err) {
                    if(err){
                        res.sendStatus(500);
                    } else {
                        res.send({'path': '/picture/' + finalName});
                    }
                });
            }
        }
    });
});

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


// api
var account = require('./routes/account');
app.use('/api/account', account);
var picture = require('./routes/picture');
app.use('/api/picture', picture);


// 路由控制
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
  next();
});
app.get('/admin/gallery', function(req, res,next) {
	res.sendFile("public/admin/gallery.html", { root:__dirname});
});
app.get('/admin/upload', function(req, res,next) {
	res.sendFile("public/admin/forms.html", { root:__dirname});
});
app.use((req,res,next)=>{
    res.send("404 not found");
})

app.listen(3000);
