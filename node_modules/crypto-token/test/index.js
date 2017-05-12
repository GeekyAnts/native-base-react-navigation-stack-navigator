
var Set = require('set-component');
var assert = require('assert');
var token = require('../');

describe('crypto-token', function(){
  it('should generate tokens of proper length', function(){
    assert(token(10).length == 10);
    assert(token(5).length == 5);
    assert(token().length == 10);
  });

  it('should generate random tokens', function(){
    var tokens = Set();
    var number = 10000;
    for (var i = 0; i < number; i++) tokens.add(token());
    assert(tokens.size());
  });

  it('should work asynchronously', function(done){
    token(function(err, res){
      assert(!err);
      assert(res.length == 10);
      done();
    });
  });

  it('should generate tokens of `length` asynchronously', function(done){
    token(5, function(err, res){
      assert(!err);
      assert(res.length == 5);
      done();
    });
  })
});