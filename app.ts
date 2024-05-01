import express, { type Express, type Request, type Response } from "express"
import { lookup } from "dns"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 3000

app.get("/", (req: Request, res: Response) => {
  const ip = req.ip as unknown as string // 客戶端 IP 地址

  // 執行反向 DNS 查詢
  lookup(ip, (err, hostname) => {
    if (err !== null) {
      console.log(`Reverse lookup failed for IP ${ip}: ${err.message}`)
      res.send(`Your IP address is ${ip}, but we couldn't determine your hostname.`)
    } else {
      console.log(`Client IP: ${ip}, Hostname: ${hostname}`)
      res.send(`Your IP address is ${ip} and your hostname is ${hostname}`)
    }
  })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
