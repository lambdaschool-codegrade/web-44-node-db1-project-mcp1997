const express = require("express");

const AccountRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter)

server.use('*', (req, res) => {
  res.send('this is a sample message proving the API works')
})

module.exports = server;
