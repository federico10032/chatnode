var express = require ('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo',function(req , res){
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: ' ',
    nickname: ' '
}];

io.on('connection', function(socket){
    console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado...");

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});
var port = process.env.PORT || 8080;
server.listen(port, function(){
    console.log('El server esta en funcion en http://localhost:'+port);

});

