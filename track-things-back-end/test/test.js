var express = require('express');
var supertest = require('supertest');
var assert = require('chai').assert;
var app = express();

// this agent refers to PORT where the program is running
var server = supertest.agent('http://localhost:3000');

describe('SAMPLE unit test', function() {

  it('should return home page', function(done) {
    // calling home page
    server
    .get('/')
    .expect('Content-type',/text/)
    .expect(200) // THis is HTTP response
    .end(function(err,res) {
      // HTTP status should be 200
      assert.equal(res.status, 200);
      done();
    });
  });

});
