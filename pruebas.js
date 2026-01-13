import uWS from 'uWebSockets.js'
import fs from 'fs'
import path from 'path'

const indexHTML = fs.readFileSync(
  path.resolve('index.html')
)

const clients = new Set()

const app = uWS.App()
const port = 3000

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

  open(ws) {
    clients.add(ws)
  },

  close(ws) {
    clients.delete(ws)
  }
})

/* ---------- STREAM ---------- */
setInterval(() => {
  const data = JSON.stringify({
    value: Math.random() * 100,
    ts: Date.now()
  })

  for (const ws of clients) {
    ws.send(data)
  }
}, 50) // 20 ticks/seg

app.listen(port, (token) => {
  if (token) {
    console.log(`uWS running on http://localhost:${port}`)
  }
})
