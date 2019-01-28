import express = require('express');
import * as WebSocket from 'ws';

export class WsServer {
  static wss: WebSocket.Server;
  static clients: { socket: WebSocket; jwt: string }[] = [];
  static initWs(server: any, express: express.Express) {
    WsServer.wss = new WebSocket.Server({ server });
    WsServer.wss.on('connection', (ws: WebSocket) => {
      ws.on('close', () => {
        WsServer.clients = WsServer.clients.filter(con => con.socket === ws);
        console.log(WsServer.clients.length);
      });
      ws.on('message', message => {
        const auth = JSON.parse(message.toString());
        WsServer.clients.push({ socket: ws, jwt: auth.token });
        console.log(WsServer.clients.length);
      });

      ws.send(JSON.stringify({}));
    });
  }

  static handlers: { distibute: express.RequestHandler } = {
    distibute: (req: express.Request, res: any, next: express.NextFunction) => {
      const org = res.send; 
      res.send = function(body: any) {
        WsServer.clients.forEach((connection: { socket: WebSocket; jwt: string }) => {
          const authHeader = req.get('Authorization');
          console.log(!authHeader.includes(connection.jwt) && (typeof body === 'object' || req.method === 'DELETE'));
          if (!authHeader.includes(connection.jwt) && (typeof body === 'object' || req.method === 'DELETE')) {
            try {
              connection.socket.send(JSON.stringify({ baseUrl: req.baseUrl, method: req.method, url: req.url, body: body }));
            } catch (e) {}
          }
        });
        org.call(this, body);
      };
      next();
    }
  };
}
