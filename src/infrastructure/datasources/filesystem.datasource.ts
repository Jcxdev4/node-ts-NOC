import fs from 'node:fs'
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-low.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'

  constructor() {
    this.createLogFiles()
  }

  private createLogFiles = () => {

    if(!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    const allPaths = [this.allLogsPath, this.mediumLogsPath, this.highLogsPath]

    allPaths.forEach(path => {
      if(fs.existsSync(path)) return

      fs.writeFileSync(path, '')
    })
    
  }

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJSON = `${JSON.stringify(newLog)}\n`

    fs.appendFileSync(this.allLogsPath, logAsJSON)

    if(newLog.level === LogSeverityLevel.low) return

    if(newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJSON)
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJSON)
    }
  }
  
  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8')
    const logs = content.split('\n').map(log => {
      return LogEntity.fromJson(log)
    })
    
    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const path = `${ this.logPath }/logs-${ severityLevel }.log`;
    return this.getLogsFromFile( path );
  }

}