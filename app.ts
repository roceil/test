import express, { type Express, type Request, type Response } from "express"
import { lookup } from "dns"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 3000

app.get("/", (req: Request, res: Response) => {
  const clientIp = req.headers["x-forwarded-for"] !== undefined || req.ip

  console.log(req.headers)
  if (typeof clientIp !== "string") {
    console.error(`Client IP is not a string: ${clientIp}`)
    res.send("An error occurred while trying to determine your IP address.")
    return
  }

  const ip = clientIp.split(",")[0].trim() as unknown as string // 如果 'x-forwarded-for' 包含多個 IP，取第一個

  lookup(ip, { verbatim: true }, (err, hostname) => {
    if (err !== null) {
      console.error(`Reverse lookup failed for IP ${ip}: ${err.message}`)
      res.send(`Your IP address is ${ip}, but we couldn't determine your hostname.`)
    } else if (hostname !== ip) {
      console.log(`Client IP: ${ip}, Hostname: ${hostname}`)
      res.send(`Your IP address is ${ip} and your hostname is ${hostname}`)
    } else {
      console.log(`Client IP: ${ip}, No hostname resolved.`)
      res.send(`Your IP address is ${ip}, but no hostname could be resolved.`)
    }
  })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
