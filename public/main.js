var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('messages', function(data){
	console.log(data); // Imprime el objeto data
	render(data); // Ejecuta la función 'render' que agrega el contenido
				  // del array de 'data' en el documento HTML
})

function render(data){
	var html = data.map(function(elemento, index){
		return(`<div>
					<strong>${elemento.author}</strong>
					<em>${elemento.text}</em>
				</div>`);
	}).join(" "); // .join divide cada elemento por un espacio

	document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
	var payload = { // Payload es el array que se pasará por el socket al servidor
		author: document.getElementById('usuario').value,
		text: document.getElementById('texto').value,
	};

	socket.emit('new-message', payload);
	return false;
}