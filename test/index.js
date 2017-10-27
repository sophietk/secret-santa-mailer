/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha')
const { should } = require('chai')

const santa = require('../lib')

should()

describe('santa', () => {
  it('should exist', () => {
    santa.should.not.be.undefined
  })

  describe('getParticipants', () => {
    it('should return participants', () => {
      santa.getParticipants().should.be.an('array').that.is.empty
    })
  })

  describe('setParticipants', () => {
    it('should change participants', () => {
      santa.setParticipants([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' }
      ])
      santa.getParticipants().should.be.an('array')
        .that.have.deep.members([
          { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
          { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' }
        ])
    })
  })

  describe('randomize', () => {
    it('should return an array with same number of participants', () => {
      santa.setParticipants([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' },
        { name: 'Elaine', email: 'elaine@monkeyisland.net' }
      ])
      santa.randomize().should.be.an('array')
        .that.have.lengthOf(3)
    })

    it('should return a loop of santas', () => {
      santa.setParticipants([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' }
      ])
      santa.randomize().should.include.deep.members([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net', shouldBuyGiftTo: 'Le Chuck' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net', shouldBuyGiftTo: 'Guybrush' }
      ])
    })
  })
})
