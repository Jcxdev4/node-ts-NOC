import { PrismaClient } from "@prisma/client"
import { envs } from "./config/plugins/env.plugin"
import { MongoDatabase } from "./data/mongo"
import { ServerApp } from "./presentation/server"


(async() => {
  await main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // const prisma = new PrismaClient()

  // const newlog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'PRIMER TEST DE NUEVO JEJEJE',
  //     origin: 'app.ts',
  //   }
  // })

  // console.log(newlog)
  
  ServerApp.start()
}