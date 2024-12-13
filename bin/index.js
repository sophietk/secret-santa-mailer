#! /usr/bin/env node

import { program } from 'commander'
import santa from '../lib/index.js'
import Mailer from '../lib/mailer.js'

program
  .description('Send mails to participants, telling each one who they need to buy a gift for.')
  .arguments('<participants>')
  .option('-d, --dry-run', 'do not send mail and log result')
  .option('-s, --subject <subject>', 'the mail subject')
  .option('-H, --host <host>', 'host address for mail configuration')
  .option('-P, --port <port>', 'port for mail configuration', parseInt)
  .option('-u, --auth-user <email>', 'auth user or email for mail configuration')
  .option('-p, --auth-password <password>', 'auth password for mail configuration')
  .parse(process.argv)

const options = program.opts()

if (program.args.length === 0) {
  program.outputHelp()
  process.exit(1)
}

console.log('Executing secret-santa...')

const participants = program.args
  .map(string => {
    const name = string.split('<')[0]
    const email = string.split('<')[1].split('>')[0]
    return { name, email }
  })

santa.setParticipants(participants)
const result = santa.randomize()

const from = options.authUser || 'noreply@secret-santa-mailer.dev'
const participantsList = participants.map(({ name, email }) => `- ${name} (${email})`).join('<br>')
const emailsToSend = result.map(santa => ({
  from: `"Secret santa 🎅" <${from}>`,
  to: santa.email,
  subject: options.subject || 'Secret santa ' + (new Date()).getFullYear(),
  html: `<h3>Hi ${santa.name},</h3>You should buy a gift for <b>${santa.shouldBuyGiftFor}</b>.<br><br>Participants:<br>${participantsList}<br>`
}))

if (options.dryRun) {
  console.log('Emails to send:', emailsToSend)
  console.log('Done !')
  process.exit(0)
}

if (!options.host || !options.port || !options.authUser || !options.authPassword) {
  console.error('Missing --host, --port, --auth-user or --auth-password options')
  process.exit(1)
}

const mailer = new Mailer({
  host: options.host,
  secureConnection: true,
  port: options.port,
  auth: {
    user: options.authUser,
    pass: options.authPassword
  }
})

Promise.all(emailsToSend.map(email => mailer.sendMail(email)))
  .then(() => {
    console.log('Done !')
  })
