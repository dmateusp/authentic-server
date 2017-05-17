const MongoClient = require('mongodb').MongoClient,
  test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017/test';
const utils = require('./utils.js')

// Connect using MongoClient
const connect = (callback) => {
  MongoClient.connect(url, function(err, db) {
    // Create a collection we want to drop later
    var col = db.collection('authentication')
    // Show that duplicate records got dropped
    callback(col)
    db.close()
  });
}
const findOne =
  (key, cb) => {
    console.log(key)
    return((collection) =>
      collection.findOne({email: key}, function(err, item) {
        cb(item)
      }))
  }


const insertOne =
  (key, value, cb) => {
    return (
      (collection) => {
        const newUser = utils.merge([{'email': key}, value])
        collection.insertOne(newUser, function(err, r) {
          cb(newUser)
        })
      }
    )
  }


module.exports = {
  MongoQuery : {
    get: (key, cb) => connect(findOne(key, cb)),
    put: (key, value, cb) => connect(insertOne(key, value, cb))
  }
}
