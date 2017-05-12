#!/usr/bin/env node

var express = require('express'),
    path = require('path'),
    postprocess = require('postprocess');

const IP_ADDRESS = process.env['IP_ADDRESS'] || '127.0.0.1';

var client = express(),
    server = express();

var subMiddleware = postprocess(function(req, buf) {
  var re = new RegExp('127\\.0\\.0\\.1', 'g');
  return buf.replace(re, IP_ADDRESS);
});

client
  .use(express.logger({ format: 'dev' }))
  .use(subMiddleware)
  .use(express.static(path.join(path.dirname(__dirname))))
  .listen(8100);

server
  .use(express.logger({ format: 'dev' }))
  .use(subMiddleware)
  .use(express.static(path.join(path.dirname(__dirname))))
  .listen(8200);

module.exports = {client: client, server: server};

console.log("An example: http://" + IP_ADDRESS + ":8100/example");
console.log("A more complicated example: http://" + IP_ADDRESS + ":8100/complex_example");
console.log("Unit tests: http://" + IP_ADDRESS + ":8100/test");
