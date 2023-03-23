const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app); // creo una propiedad llamada server y le mando mi aplicacion de express (this.app)
        this.io = require('socket.io')( this.server ); // creo una propiedad en mi servidor llamada io, y le mando el this.server.

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Configuración de sockets
        this.sockets();
    }



    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        // this.app.use( this.paths.uploads, require('../routes/uploads'));
        
    }


    sockets() {
        // detectar cuando un socket cliente se conecta.
        this.io.on('connection', socketController);
    }


    listen() {
        // this.server es el nuevo server http que recibe el this.app de express, ya no es el de express directamente.
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;