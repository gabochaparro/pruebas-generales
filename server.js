import uWS from 'uWebSockets.js'
import fs from 'fs'
import path from 'path'

const indexHTML = fs.readFileSync(
  path.resolve('index.html')
)

const clients = new Set()

const app = uWS.App()
const port = 80

/* ---------- HTTP ---------- */
app.get('/', (res, req) => {
  res.writeHeader('Content-Type', 'text/html')
  res.end(indexHTML)
})

/* ---------- WEBSOCKET ---------- */
app.ws('/ws', {
  compression: 0,
  maxPayloadLength: 1024,
  idleTimeout: 0,

  open: (ws) => {
    ws.subscribe('bot');
    console.log(`Conectado el cliente: ${ws.ip}`);
  },

  message: (ws, message) => {
    const msg = Buffer.from(message).toString();
    console.log('WS recibe:', msg);

    // Broadcast a todos
    app.publish('bot', msg);
  },

  close(ws) {
    clients.delete(ws)
  }
})

app.listen(port, (token) => {
  if (token) {
    console.log(`uWS running on http://localhost:${port}`)
  }
})
