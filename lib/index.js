import _ from 'lodash'

let participants = []

export const getParticipants = () => participants

export const setParticipants = (newParticipants) => {
  participants = newParticipants
}

export const randomize = () => {
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
