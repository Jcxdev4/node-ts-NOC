import { CronJob } from 'cron'

// CreateJob types
type CronTime = string | Date
type OnTick = () => void

export class CronService {

  public static CreateJob(cronTime: CronTime, onTick: OnTick) {
    const job = new CronJob(cronTime, onTick)

    job.start()

    return job
  }
}