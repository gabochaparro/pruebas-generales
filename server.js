import uWS from 'uWebSockets.js';

const app = uWS.App();

const PORT = process.env.PORT || 80;

app.ws('/*', {

  open: (ws) => {
    ws.subscribe('bot');
  },

  message: (ws, message) => {
    const msg = Buffer.from(message).toString();
    console.log('WS recibe:', msg);

    // Broadcast a todos
    app.publish('bot', msg);
  }
});

app.listen(PORT, (token) => {
  if (token) console.log('uWS escuchando en', PORT);
});

