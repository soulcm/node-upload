var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

// var upload = multer({ dest: 'upload/' });
var storage = multer.diskStorage({
    // destination: 'upload', //string时,服务启动将会自动创建文件夹
    destination: function (req, file, cb) { //函数需手动创建文件夹
        var filepath = path.join(__dirname, 'upload');
        if (!fs.existsSync(filepath)) {
            fs.mkdir(filepath, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    cb(null, filepath);
                }
            })
        } else {
            cb(null, filepath);
        }
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})

var upload = multer({ storage: storage })
var app = express();
var uploadSingle = upload.single('logo');

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/uploadSingle', function(req, res, next){
    uploadSingle(req, res, function(err) { //错误处理
        if (err) return
        var file = req.file;

        console.log('文件类型：%s', file.mimetype);
        console.log('原始文件名：%s', file.originalname);
        console.log('文件大小：%s', file.size);
        console.log('文件保存路径：%s', file.path);
        console.log(file.fieldname);
        console.log(file.size);
        console.log(file.destination);

        res.send({ret_code: '0'});

    })


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