#! /usr/bin/env node

const program = require('commander')

program
  .option('-d, --dry-run', 'do not send mail and log result')
  .parse(process.argv)

if (program.args.length === 0) {
  program.outputHelp()
} else {
  execute()
}

function execute () {
  console.log('Executing secret-santa...')

  const participants = program.args
    .map(string => {
      const name = string.split('<')[0]
      const email = string.split('<')[1].split('>')[0]
      return { name, email }
    })

  const santa = require('../lib')
  santa.setParticipants(participants)
  const result = santa.randomize()

  result.forEach(santa => {
    const email = {
      subject: 'Secret santa',
      to: santa.email,
      body: `Hi ${santa.name}, you should buy a gift for ${santa.shouldBuyGiftFor} \n\nParticipants: ${program.args}`
    }
    if (program.dryRun) {
      console.log(email)
    } else {
      // todo, send mail
    }
  })

  console.log('Done!')
}
