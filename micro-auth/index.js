var fs = require('fs')
var http = require('http')
var Authentic = require('../')
const email = require('./send-email-nodemailer.js')
const mongo = require('./mongo-users.js')

var auth = Authentic({
  db: mongo.MongoQuery,
  publicKey: fs.readFileSync(__dirname + '/rsa-public.pem'),
  privateKey: fs.readFileSync(__dirname + '/rsa-private.pem'),
  sendEmail: email.sendEmail
})

var server = http.createServer(function (req, res) {
  auth(req, res, next)

  function next (req, res) {
    // not an authentic route, send 404 or send to another route
    res.end('Not an authentic route =)')
  }
})

const port = typeof(process.env.PORT) !== 'undefined' ? process.env.PORT : 1337
server.listen(port)
console.log('Authentic enabled server listening on port', port)
