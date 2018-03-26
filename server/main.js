/* Dependencias */
var express = require('express');
var app = express();
var servidor = require('http').Server(app);
var io = require('socket.io')(servidor);

var messages = [{ // Array donde se almacenará los datos de cada mensaje
	id: 1,
	text: "Mensaje de prueba",
	author: "Nelson Goncalves"
}];

app.use(express.static('public')); // Utiliza la carpeta 'public'

app.get('/hola', function(req, res){ // Al ingresar en localhost:8080/hola
	res.status(200).send("Hola mundo!"); // Imprimirá "Hola mundo!"
});

io.on('connection', function(socket){
	console.log("Se ha recibido un socket.");
	socket.emit('messages',  messages); // Emite el nuevo socket

	socket.on('new-message', function(data){
		messages.push(data); // Agrega el nuevo mensaje a la pila de mensajes

		io.sockets.emit('messages', messages); // Actualiza los sockets de todos los clientes conectados
	});
});

servidor.listen(8080, function(){ // Inicia el servidor en el puerto 8080
	console.log("Servidor iniciado en el puerto 8080");
});