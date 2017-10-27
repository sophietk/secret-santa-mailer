let participants = []

const getParticipants = () => participants

const setParticipants = (newParticipants) => {
  participants = newParticipants
  console.log('participants', participants)
}

module.exports = {
  getParticipants,
  setParticipants
}
