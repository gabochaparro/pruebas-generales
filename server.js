import uWS from 'uWebSockets.js';

const app = uWS.App();

const PORT = process.env.PORT;

app.get('/', (res) => {
  res.writeHeader('Content-Type', 'text/html')
  res.end("Servidor uWS")
})

app.ws('/ws', {

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

