#! /usr/bin/env node

const santa = require('../lib')

console.log('Executing secret-santa...')

const participants = process.argv.slice(2)
  .map(string => {
    const name = string.split('<')[0]
    const email = string.split('<')[1].split('>')[0]
    return { name, email }
  })

santa.setParticipants(participants)
const result = santa.randomize()

console.log(result)
