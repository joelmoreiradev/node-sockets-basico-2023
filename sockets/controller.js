

const socketController = (socket) => {

    console.log('Cliente conectado.', socket.id); // socket.id es un id de cliente
    
    // este socket.on es parte del socket que recibe el evento connection.
    socket.on('disconnect', () => {
        console.log('Cliente desconectado.', socket.id);
    });


    // escuchar lo que se emite desde el cliente en el evento 'enviar-mensaje'.
    // recibo el mensaje, en una propiedad llamada payload (puede ser cualquier nombre)
    socket.on('enviar-mensaje', (payload, callback) => {
        // imprimir en consola el payload recibido mediante el socket.
        console.log(payload);
        const id = 123456;
        callback(id);
        // emitir el mismo evento que el cliente envía, pero en este caso lo emito desde el servidor para luego escucharlo en el cliente.
        // es decir: primero uno de los clientes emite enviar-mensaje, el server escucha enviar-mensaje, y luego el mismo server vuelve a emitir ese enviar-mensaje para todos los clientes.
        socket.broadcast.emit('enviar-mensaje', payload);

    });


}






module.exports = {
    socketController
}