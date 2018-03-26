const express = require('express')
const mongoose = require('mongoose')
// 链接mongo
const DB_URL = 'mongodb://localhost:27017/talk'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('monqo connection success')
})

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}
}))

// User.create({
//   user: 'zy2',
//   age: '12'
// }, function (err, doc) {
//   if (!err) {
//     console.log(doc, 'doc')
//
//   } else {
//     console.log(err, 'err')
//   }
// })
// User.remove({age: '12'}, function (err,doc) {
//   console.log(doc, 'remove')
// })
User.update({'user': 'zy2'}, {'$set': {age: 26}}, function (err, doc) {
  console.log(doc, 'update')
})

const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')
})
app.get('/at', function (req, res) {
  // User.find({}, function (err, doc) {
  //   console.log('~~~~~~~~1')
  //   res.json(doc)
  //
  // })
  // console.log('~~~~~~~~0')
  User.findOne({user: 'zy2'}, function (err, doc) {
    console.log('~~~~~~~~2')
    res.json(doc)

  })
})
app.listen(9093,function () {
  console.log('node app start at port 9093 ~')
})