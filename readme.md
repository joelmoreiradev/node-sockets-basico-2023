Este servidor basicamente lo que hace es:

[socket-client.js]: Emitir (o escuchar en el caso de conexiones) eventos mediante socket.emit('nombreEvento', contenido);

[server.js]: Escuchar eventos (conexión, desconexión, y el evento personalizado). En base a esos eventos recibidos, realizar diferentes acciones personaliadas.

Tengo que recordar que los sockets son una forma de comunicación bidireccional, por lo que tanto desde el server como desde el cliente se puede emitir y escuchar si así lo deseo.

Además, es muy importante recordar que para que todo esto funcione debo tener en el index.html los scripts:
    <script src="./socket.io/socket.io.js"></script>
    <script src="./js/socket-client.js"></script>

El primero es parte del paquete de socket.io, queda automaticamente expuesto en http://localhost:8080/socket.io/socket.io.js, y es necesario para que funcione la comunicación con el socket del servidor.

El segundo ya es el script que escribo yo para manejar los eventos.