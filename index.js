
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  // console.log('a user connected');
  socket.emit('welcome message', 'Bienvenido al chat');

  // io.sockets.emit('connect user', 'Un usuario se conectado');

  socket.on('connect user', function(msg){
    socket.broadcast.emit('connect user', 'El usuario ' + msg + ' se conectado');
  });


  socket.on('disconnect', function(){
    // console.log('user disconnected');
    io.emit('disconnect', 'Un usuario se a desconectado del chat');
  });

  socket.on('chat message', function(msg){
    // console.log('message: ' + msg);
    io.emit('chat message', msg.user + ': ' + msg.message);
  });

  socket.on('is typing', function(user){
    socket.broadcast.emit('is typing', user + ' is typing.');
  });

  socket.on('is typing done', function(){
    socket.broadcast.emit('is typing done', true);
  })

})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
