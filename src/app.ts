import { envs } from "./config/plugins/env.plugin"
import { ServerApp } from "./presentation/server"


(async() => {
  await main()
})()

async function main() {
  // ServerApp.start()
  console.log(envs)
}