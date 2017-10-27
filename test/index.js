/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha')
const { should } = require('chai')

const santa = require('../lib')

should()

describe('santa', () => {
  it('should exist', () => {
    santa.should.not.be.undefined
  })
})
