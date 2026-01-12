import uWS from 'uWebSockets.js';

const app = uWS.App();

app.ws('/*', {
  upgrade: (res, req, ctx) => {
    res.upgrade(
      {
        ip: Buffer.from(res.getRemoteAddress()).join('.'),
        token: req.getHeader('authorization'),
        ua: req.getHeader('user-agent')
      },
      req.getHeader('sec-websocket-key'),
      req.getHeader('sec-websocket-protocol'),
      req.getHeader('sec-websocket-extensions'),
      ctx
    );
  },

  open: (ws) => {
    ws.subscribe('bot');
    console.log(`Conectado el cliente: ${ws.ip}`);
  },

  message: (ws, message) => {
    const msg = Buffer.from(message).toString();
    console.log('WS recibe:', msg);

    // Broadcast a todos
    app.publish('bot', msg);
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, (token) => {
  if (token) console.log('uWS escuchando en', PORT);
});

