import path from 'path';
import net from 'net';
import http from 'http';
import https from 'https';
import debug from 'debug';
import fs from 'fs-extra';
import { App } from './app';
import { Config } from './types';
import { WsServer } from './ws';

const configFile = path.resolve(process.argv[process.argv.length - 1] || './config.json');
if (!fs.existsSync(configFile)) {
    throw new Error(`No config file found: "${configFile}"`);
}

const config: Config = fs.readJsonSync(configFile);

if (process.argv.indexOf('--debug') !== -1) {
    debug.enable('*');
}

App.factory(config).then(app => {
    const express = app.express;

    // Create HTTP server.
    let server: net.Server;
    if (config.ssl.enabled) {
        server = https.createServer({
            key: fs.readFileSync(config.ssl.key),
            cert: fs.readFileSync(config.ssl.cert)
        }, express);
    } else {
        server = http.createServer(express);
    }

    WsServer.initWs(server, express);

    // Bind HTTP server
    let address: string;
    if ('port' in config) {
        if ('host' in config) {
            server.listen(config.port, config.host);
            address = `address ${config.host}:${config.port}`;
        } else {
            server.listen(config.port);
            address = `address 0.0.0.0:${config.port}`;
        }
    } else if ('socket' in config) {
        server.listen(config.socket);
        address = `socket '${config.socket}'`;
    } else {
        server.listen(config.socket);
        address = 'address 0.0.0.0:0';
    }
    console.info(`Binding to ${address}`);

    // Check for network errors
    server.on('error', (error: any) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${address} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${address} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });

    // Check for successful address bind
    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string'
            ? `socket ${address}`
            : `address ${address.address}:${address.port}`;
        debug('http')(`Listening on ${bind}`);
    });
}).catch(error => {
    console.error(error);
});
