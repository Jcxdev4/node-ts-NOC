import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {

  constructor (
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {
  
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if(!req.ok) {
        throw new Error(`Error on Check Service ${url}`)
      }

      const args = {
        level: LogSeverityLevel.low,
        message: `Service: ${url} working...`,
        createdAt: new Date(),
        origin: __filename.slice(__dirname.length + 1)
      }

      const log = new LogEntity(args)
      
      this.logRepository.saveLog(log)
      this.successCallback && this.successCallback()
      return true

    } catch (error) {
      const args = {
        level: LogSeverityLevel.high,
        message: `Error: ${error}`,
        createdAt: new Date(),
        origin: 'check_service.ts'
      }
      const log = new LogEntity(args)

      this.logRepository.saveLog(log)
      this.errorCallback && this.errorCallback(`${error}`)
      console.log(`${error}`)
      return false
    }
  }
}