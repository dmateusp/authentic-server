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
    return((collection) =>
      collection.findOne({email: key}, function(err, item) {
        const user = item ? item : undefined
        setImmediate(cb, null, user)
      }))
  }


  const upsert =
    (key, value, cb) => {
      return (
        (collection) => {
          const user = utils.merge([{'email': key}, value])
          collection.updateOne({'email': user.email}, {$set: user}, {upsert: true}, function(err, r) {
            setImmediate(cb, null)
          })
        }
      )
    }


module.exports = {
  MongoQuery : {
    get: (key, cb) => connect(findOne(key, cb)),
    put: (key, value, cb) => connect(upsert(key, value, cb))
  }
}
