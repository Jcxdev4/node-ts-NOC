import { CheckService } from "../domain/use-cases/checks/check_service";
import { CronService } from "./cron/cron_service";
import { LogRepositoryImplementation } from '../infrastructure/repositories/log-impl.repository';
import { FileSystemDatasource } from "../infrastructure/datasources/filesystem.datasource";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
)

export class ServerApp {

  // Publico para indicar que el metodo es publico.
  // Statico para poder usarlo sin crear instancia.
  public static start() {
    
    CronService.CreateJob(
      '*/4 * * * * *', () => {
        const url = 'http://localhost:3000/3'
        new CheckService(
          fileSystemLogRepository,
          // () => console.log(`Success ${url} is ok!`),
          undefined,
          // (error) => console.log(error)
          undefined
        ).execute(url)
        // new CheckService().execute('http://localhost:3000/3')
    })
  }
}