// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

// Este es el socket del cliente.
// Esto es parte del script ./socket.io/socket.io.js
// Solo con haber importado/declarado esto, el socket ya se conecta.
const socket = io();

// Eventos
socket.on('connect', () => {
    console.log('Conectado');

    // Cuando el socket se conecta, desactivo el estilo del lblOffline, y borro el style.display none de lblOnline para que se vea.
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});


socket.on('disconnect', () => {
    console.log('Desconectado del servidor.');

    // Cuando el socket se desconecta, desactivo el estilo del lblOnline, y borro el style.display none de lblOffline para que se vea.
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';

});

// escuchar el enviar-mensaje que emite el servidor inmediatamente despues de que uno de los clientes lo emita primero.
socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

// agrego un EventListener de javascript al boton para poder detectar cuando se hace click
btnEnviar.addEventListener( 'click', () => {

    // cuando se presiona, obtengo el valor del txtMensaje
    const mensaje = txtMensaje.value;

    // creo un objeto llamado payload, que es lo que voy a enviar mediante el socket.
    // la idea es en un mismo evento mandar toda la información posible, por eso se hace esto en lugar de mandar solo el mensaje.
    const payload = {
        mensaje,
        id: '123ASD',
        fecha: `${new Date().getDate()} / ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`,
    }
    
    // emitir un evento mediante socket. 'enviar-mensaje' es el nombre del evento, y payload es lo que voy a enviar
    // ? Forma basica de emitir un evento: socket.emit('enviar-mensaje', payload);
    // como tercer argumento mando un callback
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id);
    });

});