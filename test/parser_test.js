const assert = require('assert');

const {
  splitKeyValue,
  placeInObject,
  readArgs
} = require('../src/parse.js');

describe('splitKeyValue',() => {
  it('should return key value as an array',() => {
    const actual = splitKeyValue('name=NAME');
    const expected = ['name','NAME'];
    assert.deepEqual(actual,expected);
  })
})

describe('placeInObject',() => {
  it('should return an object one key',() => {
    const actual = {}
    placeInObject(actual,'name=NAME');
    const expected = {
      name:'NAME'
    }
    assert.deepEqual(actual,expected);
  });
  it('should add key to the actual',() => {
    const actual = {
      name:'NAME'
    };
    placeInObject(actual,'comment=COMMENT')
    const expected = {
      name:'NAME',
      comment:'COMMENT'
    }
    assert.deepEqual(actual,expected);
  })
});

describe('readArgs',() => {
  it('should return one key value pair as object',() => {
    const actual = readArgs('name=NAME');
    const expected = {
      name:'NAME'
    }
    assert.deepEqual(actual,expected);
  });
  it('should return more than one key value pair as object when separated by & symbol',() => {
    const actual = readArgs('name=NAME&comment=Comments');
    const expected = {
      name:'NAME',
      comment:'Comments'
    }
    assert.deepEqual(actual,expected);
  })
})