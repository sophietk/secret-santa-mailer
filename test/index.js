/* eslint-disable no-unused-expressions */

import { describe, it } from 'mocha'
import 'chai/register-should.js'

import { getParticipants, setParticipants, randomize } from '../lib/index.js'

describe('santa', () => {
  describe('getParticipants', () => {
    it('should return participants', () => {
      getParticipants().should.be.an('array').that.is.empty
    })
  })

  describe('setParticipants', () => {
    it('should change participants', () => {
      setParticipants([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' }
      ])
      getParticipants().should.be.an('array')
        .that.have.deep.members([
          { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
          { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' }
        ])
    })
  })

  describe('randomize', () => {
    it('should return an array with same number of participants', () => {
      setParticipants([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' },
        { name: 'Elaine', email: 'elaine@monkeyisland.net' }
      ])
      randomize().should.be.an('array')
        .that.have.lengthOf(3)
    })

    it('should return a loop of santas', () => {
      setParticipants([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net' }
      ])
      randomize().should.include.deep.members([
        { name: 'Guybrush', email: 'guybrush@monkeyisland.net', shouldBuyGiftFor: 'Le Chuck' },
        { name: 'Le Chuck', email: 'le-chuck@monkeyisland.net', shouldBuyGiftFor: 'Guybrush' }
      ])
    })
  })
})
