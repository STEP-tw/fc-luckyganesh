const assert = require('assert');

const {
  isMatching,
  Express
} = require('../src/express.js');

describe('isMathing',function(){
  it('should return true when there is no method and no url for route', () => {
    const req = {
      url:'url',
      method:'method'
    }
    const route = {};
    const actual = isMatching(req,route);
    const expected = true;
    assert.equal(actual,expected);
  })
  it('should return true when the req method and url are matched with route', () => {
    const req = {
      url:'url',
      method:'method'
    }
    const route = {
      url: 'url',
      method:'method'
    };
    const actual = isMatching(req,route);
    const expected = true;
    assert.equal(actual,expected);
  })
  it('should return false when the req method is not matched with route', () => {
    const req = {
      url:'url',
      method:'method'
    }
    const route = {
      url: 'url',
      method:'methods'
    };
    const actual = isMatching(req,route);
    const expected = false;
    assert.equal(actual,expected);
  })
  it('should return false when the req method is not matched with route', () => {
    const req = {
      url:'url',
      method:'method'
    }
    const route = {
      url: 'urls',
      method:'method'
    };
    const actual = isMatching(req,route);
    const expected = false;
    assert.equal(actual,expected);
  })
});