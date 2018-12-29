import { App, AppFactory } from './app';
import debug from 'debug';
import http from 'http';
import path from 'path';
import fs from 'fs-extra';

const configFile = path.resolve(process.argv[2] || './config.json');
if (!fs.existsSync(configFile)) {
    throw new Error(`No config file found: "${configFile}"`);
}

const config = fs.readJsonSync(configFile);

AppFactory(config).then(appInstance => {
    const app = appInstance.app;
    /**
     * Get port from environment and store in Express.
     */

    const port = normalizePort(config.port || process.env.PORT || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);



    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

});




/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

