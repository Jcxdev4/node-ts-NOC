import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugin'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachements?: Attachement[]
}

interface Attachement {
  filename: string
  path: string
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  constructor(
    // private readonly logRepository: LogRepository
  ) {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    
    const { to, subject, htmlBody } = options


    try {

      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody
      })

      console.log(sentInformation)
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent!',
        origin: 'email.service.ts'
      })

      // this.logRepository.saveLog(log)

      return true
    } catch (error) {
      console.error(error)
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email was not sent!',
        origin: 'email.service.ts'
      })

      // this.logRepository.saveLog(log)
      return false

    }
  }

  async sendEmailWithFileSystemLogs (to: string | string[]) {
    const subject = 'Logs del servidor'
    const htmlBody = `
    <h2>Hola!</h2>
    <p>Hola, ando probando esto!</p>
    <p>Hola mundo como estan espero que bien aaaaaaaaaaaaaaaaaaaaaa</p>
    <p><b>VEr Adjuntos</b></p>
    `

    const attachments: Attachement[] = [
      {
        filename: 'logs-high.log',
        path: 'logs/logs-high.log'
      },
      {
        filename: 'logs-medium.log',
        path: 'logs/logs-medium.log'
      },
      {
        filename: 'logs-low.log',
        path: 'logs/logs-low.log'
      }
    ]

    return this.transporter.sendMail({
      to, subject, html: htmlBody, attachments: attachments
    })
  }
}