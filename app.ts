import express, { type Express, type Request, type Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 3000

app.get("/", (req: Request, res: Response) => {
  const ip = req.ip // 客戶端 IP 地址
  const host = req.headers.host // 客戶端訪問的域名

  console.log(`Client IP: ${ip}, Host: ${host}`)
  res.send(`Your IP address is ${ip} and you are visiting ${host}`)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
