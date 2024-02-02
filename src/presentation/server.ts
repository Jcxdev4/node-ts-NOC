import { CheckService } from "../domain/use-cases/checks/check_service";
import { CronService } from "./cron/cron_service";



export class ServerApp {

  // Publico para indicar que el metodo es publico.
  // Statico para poder usarlo sin crear instancia.
  public static start() {
    
    CronService.CreateJob(
      '*/4 * * * * *', () => {
        const url = 'http://google.com'
        new CheckService(
          () => console.log('Success'),
          (error) => console.log(error)
        ).execute(url)
        // new CheckService().execute('http://localhost:3000/3')
    })
  }
}