import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}


// Seria lo mismo que una clase abstracta
/*
export interface LogDatasource {
  saveLog(log: LogEntity): Promise<void>
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
*/