const _ = require('lodash')

let participants = []

const getParticipants = () => participants

const setParticipants = (newParticipants) => {
  participants = newParticipants
}

const randomize = () => {
  let remainingSantas = participants
  let result = []
  let currentSanta = _(remainingSantas).shuffle().head()

  while (!_.isEmpty(remainingSantas)) {
    remainingSantas = _.without(remainingSantas, currentSanta)
    const nextSanta = _(remainingSantas).shuffle().head() || result[0]
    result.push({
      name: currentSanta.name,
      email: currentSanta.email,
      shouldBuyGiftFor: nextSanta.name
    })
    currentSanta = nextSanta
  }

  return result
}

module.exports = {
  getParticipants,
  setParticipants,
  randomize
}
