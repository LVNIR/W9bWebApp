var express = require('express');
var app = express.Router();

app.use('/JS', express.static('JS'));
app.use('/CSS', express.static('CSS'));
app.use('/file', express.static('file'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
})

app.get('/sign_up', function (req, res) {
    res.sendFile(__dirname + "/" + "sign up.html");
})

app.get('/upload_page', function (req, res) {
    res.sendFile(__dirname + "/" + "upload_page.html");
})


app.post('/process_get', function (req, res) {

    // 输出 JSON 格式
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

// var server = app.listen(8081, function () {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })