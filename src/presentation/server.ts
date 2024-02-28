import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron_service";
import { LogRepositoryImplementation } from '../infrastructure/repositories/log-impl.repository';
import { FileSystemDatasource } from "../infrastructure/datasources/filesystem.datasource";
import { EmailService } from './email/email.service';
import { SendEmailLogs } from "../domain/use-cases/email/send-email";
import { MongoLogDatasource } from "../infrastructure/datasources/mongodb.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multi";

const fslogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
  // new MongoLogDatasource()
  // new PostgresLogDatasource()
)

const mongologRepository = new LogRepositoryImplementation(
  // new FileSystemDatasource()
  new MongoLogDatasource()
  // new PostgresLogDatasource()
)

const postgreslogRepository = new LogRepositoryImplementation(
  // new FileSystemDatasource()
  // new MongoLogDatasource()
  new PostgresLogDatasource()
)

export class ServerApp {

  // Publico para indicar que el metodo es publico.
  // Statico para poder usarlo sin crear instancia.
  public static async start() {
    
    console.log('Server started...')

    // Mandar email
    // const emailService = new EmailService()
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute('fatalysticgd@gmail.com')

    // Get Logs
    // const logs = await logRepository.getLogs(LogSeverityLevel.high)
    // console.log(logs)

    CronService.CreateJob(
      '*/4 * * * * *', () => {
        const url = 'http://google.com.do'
        new CheckServiceMultiple(
          [fslogRepository, mongologRepository, postgreslogRepository],
          () => console.log(`Success ${url} is ok!`),
          // undefined,
          (error) => console.log(error)
          // undefined
        ).execute(url)
        // new CheckService().execute('http://localhost:3000/3')
    })
  }
}