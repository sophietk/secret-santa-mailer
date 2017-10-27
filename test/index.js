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
      santa.setParticipants(['Guybrush', 'Le Chuck'])
      santa.getParticipants().should.be.an('array')
        .and.have.members(['Guybrush', 'Le Chuck'])
    })
  })
})
