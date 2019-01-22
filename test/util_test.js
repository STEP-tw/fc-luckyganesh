const assert = require('assert');

const {
  logRequest,
  readBody,
  readComments,
  resolveFileName
} = require('../src/utils.js')

describe('logRequest', () => {
  const console = {
    stdOut: [],
    log: function (...args) {
      this.stdOut = this.stdOut.concat(args)
    }
  }

  beforeEach(function () {
    console.stdOut = [];
  })

  it('should return method as GET and url as ./index.html', (done) => {
    const next = function () {
      assert.deepEqual(console.stdOut, ['GET', './index.html']);
      done();
    }

    const req = {
      method: 'GET',
      url: './index.html'
    }

    logRequest(console, req, {}, next);
  });

  it('should return method as POST and url as ./something', (done) => {
    const next = function () {
      assert.deepEqual(console.stdOut, ['POST', './something']);
      done();
    }

    const req = {
      method: 'POST',
      url: './something'
    }

    logRequest(console, req, {}, next);
  })

})

describe('readBody', () => {
  it('should add some text to the body of request', (done) => {
    const req = {
      on: function (type, callback) {
        if (type == 'data') {
          callback('name=name');
          return;
        }
        if (type == 'end') {
          callback();
          return;
        }
        return;
      }
    }
    const next = function () {
      assert.deepEqual(req.body, { name: 'name' });
      done();
    }
    readBody(req, {}, next);
  });
  it('should add the text to the body even if we are giving more than one time', (done) => {
    const req = {
      on: function (type, callback) {
        if (type == 'data') {
          callback('name=name');
          callback('&comment=comment')
          return;
        }
        if (type == 'end') {
          callback();
          return;
        }
        return;
      }
    }
    const next = function () {
      assert.deepEqual(req.body, { name: 'name', comment: 'comment' });
      done();
    }
    readBody(req, {}, next);
  })
});

describe('readComments', () => {
  it('should return the html format of tbody when no comments are specified', () => {
    const comments = {
      comments: [],
      getComments: function () { return this.comments }
    }
    assert.deepEqual(readComments(comments), "")
  });
  it('should return the tbody format when one comment is specified', () => {
    const comments = {
      comments: [{
        name: "name",
        comment: 'something',
        date: {
          toLocaleString: function () {
            return '1/22/2019, 9:09:43 AM';
          }
        }
      }],
      getComments: function () { return this.comments }
    }
    let expectedOutput = `<tr><td>1/22/2019, 9:09:43 AM</td><td>name</td><td>something</td></tr>`
    assert.deepEqual(readComments(comments), expectedOutput);
  });
  it('should return the tbody format when more than one comment is specified', () => {
    const comments = {
      comments: [
        {
          name: "name",
          comment: 'something',
          date: {
            toLocaleString: function () {
              return '1/22/2019, 9:09:43 AM';
            }
          }
        },
        {
          name: "name2",
          comment: 'someOne',
          date: {
            toLocaleString: function () {
              return '1/22/2019, 9:15:43 AM';
            }
          }
        }
      ],
      getComments: function () { return this.comments }
    }
    let expectedOutput = `<tr><td>1/22/2019, 9:15:43 AM</td><td>name2</td><td>someOne</td></tr>`;
       expectedOutput += `<tr><td>1/22/2019, 9:09:43 AM</td><td>name</td><td>something</td></tr>`;
    assert.deepEqual(readComments(comments), expectedOutput);
  })
})

describe('resolveFileName', () => {
  it('should return url with prefix',() => {
    const actual = resolveFileName('/index.html');
    const expected = `./public/index.html`;
    assert.deepEqual(actual,expected);
  });
  it('should return with added prefix for url / as /index.html',() => {
    const actual = resolveFileName('/');
    const expected = `./public/index.html`;
    assert.deepEqual(actual,expected);
  })
})