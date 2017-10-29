#! /usr/bin/env node

const program = require('commander')
const santa = require('../lib')
const Mailer = require('../lib/mailer')

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

const from = program.authUser || 'noreply@secret-santa-mailer.dev'
const participantsList = participants.map(({ name, email }) => `- ${name} (${email})`).join('<br>')
const emailsToSend = result.map(santa => ({
  from: `"Secret santa 🎅" <${from}>`,
  to: santa.email,
  subject: program.subject || 'Secret santa ' + (new Date()).getFullYear(),
  html: `<h3>Hi ${santa.name},</h3>You should buy a gift for <b>${santa.shouldBuyGiftFor}</b>.<br><br>Participants:<br>${participantsList}<br>`
}))

if (program.dryRun) {
  console.log('Emails to send:', emailsToSend)
  console.log('Done !')
  process.exit(0)
}

if (!program.host || !program.port || !program.authUser || !program.authPassword) {
  console.error('Missing --host, --port, --auth-user or --auth-password options')
  process.exit(1)
}

const mailer = new Mailer({
  host: program.host,
  secureConnection: true,
  port: program.port,
  auth: {
    user: program.authUser,
    pass: program.authPassword
  }
})

Promise.all(emailsToSend.map(email => mailer.sendMail(email)))
  .then(data => {
    console.log('Done !')
  })
