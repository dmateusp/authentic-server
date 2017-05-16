var fs = require('fs')
var http = require('http')
var Authentic = require('../')
const email = require('./send-email-nodemailer.js')

var auth = Authentic({
  db: __dirname + '/../db/',
  publicKey: fs.readFileSync(__dirname + '/rsa-public.pem'),
  privateKey: fs.readFileSync(__dirname + '/rsa-private.pem'),
  sendEmail: email.sendMail
})

var server = http.createServer(function (req, res) {
  auth(req, res, next)

  function next (req, res) {
    // not an authentic route, send 404 or send to another route
    res.end('Not an authentic route =)')
  }
})

server.listen(1337)
console.log('Authentic enabled server listening on port', 1337)
