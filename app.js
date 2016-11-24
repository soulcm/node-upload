var express = require('express');
var multer = require('multer');
var path = require('path');

var upload = multer({ dest: 'upload/' });
var app = express();

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/uploadSingle', upload.single('logo'), function(req, res, next){
    var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    console.log(file.fieldname);
    console.log(file.size);
    console.log(file.destination);

    res.send({ret_code: '0'});
});


app.post('/uploadArray', upload.array('logo'), function(req, res, next){
    var files = req.files;
    console.log(files)

    res.send({ret_code: '0'});
});

app.post('/uploadFields', upload.fields([{name: 'logo', maxCount: 1}, {name: 'avatar', maxCount: 3}]), function(req, res, next){
    var files = req.files;
    console.log(files)

    res.send({ret_code: '0'});
});

app.listen(3000, function (err) {
    console.log('Listening at http://127.0.0.1:3000');
});