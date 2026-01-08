import express, { Request, Response } from "express"

const app = express()
const port: number | any = process.env.PORT || 3000

app.get("/", (req:Request, res:Response) => {
    res.json({saludo: "Hola desde TypeScript"})
})

app.listen(port, () => console.log(`Servicio en puerto ${port}`))