var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var configLoader = require('config-json');

configLoader.load('./config.json');

var intervalObj;
var config = configLoader.get();
var process;
var isStreaming = false;

io.origins(config['client-host'] + ':' + config['client-port']);

http.listen(config['port'], function() {
    console.log('listening on *:' + config['port']);
});

io.on('connection', function(socket) {
    socket.on('start-stream', function() {
        if (!isStreaming) {
            startStreaming();
        } else {
            sendImage();
        }
    });

    socket.on('disconnect', function() {
        if (io.engine.clientsCount == 0) {
            stopStreaming();
        }
    });
});

function startStreaming() {
    console.log('Starting stream.');
    isStreaming = true;
    intervalObj = setInterval(takeImage, config['capture-rate']);
}

function stopStreaming() {
    console.log('Stopping stream.');
    isStreaming = false;
    if (process) {
        process.kill();
    }
    clearInterval(intervalObj);
}

function takeImage() {
    //console.log('taking image');
    var args = [
        '-w', config['image-width'],   // width
        '-h', config['image-height'],  // height
        '-t', config['capture-time'],  // how long should taking the picture take?
        '-o', getAbsoluteImagePath()   // path + name
    ];
    process = spawn('raspistill', args);
    process.on('exit', sendImage);
}

function sendImage() {
    //console.log('sending image');
    fs.readFile(getAbsoluteImagePath(), function(err, buffer){
        io.sockets.emit('live-stream', buffer.toString('base64'));
    });
}

function getAbsoluteImagePath() {
    return path.join(__dirname, config['image-path'], config['image-name']);
}
