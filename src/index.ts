import express from "express"
import { AddressInfo } from "net"
import { userRouter } from "./controller/routes/userRouter"
import { bandsRouter } from "./controller/routes/bandsRouter"
import { showsRouter } from "./controller/routes/showsRouter"

const app = express()


app.use(express.json())

app.use("/user", userRouter)
app.use("/bands", bandsRouter)
app.use("/shows", showsRouter)


const server = app.listen(3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`)
   } else {
      console.error(`Falha ao rodar o servidor.`)
   }
})