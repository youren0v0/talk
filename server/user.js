const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')

const User = model.getModel('user')

Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})
Router.post('/login', function(req, res){
  console.log(req.body, 'body')
  const {user, password} = req.body
  User.findOne({user},function(err,doc){
    console.log(doc, 'doc')
    if (doc) {
      if (doc.password !== md5Pwd(password)) {
        return res.json({code:1, msg:'密码错误'})
      }
      res.cookie('userid', doc._id)
      return res.json({code:0, msg:'登录成功'})
    } else {
      return res.json({code:1, msg:'用户不存在'})
    }
  })
})
Router.post('/register', function(req, res){
  console.log(req.body, 'body')
  const {user, password, type} = req.body
  User.findOne({user},function(err,doc){
    console.log(doc, 'doc')
    if (doc) {
      return res.json({code:1,msg:'用户名重复'})
    }
    User.create({user, password: md5Pwd(password), type}, function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      return res.json({code: 0, msg: '注册成功'})
    })
  })
})
function md5Pwd(password) {
  const salt = 'my_react_demo'
  return utils.md5(utils.md5(password + salt))
}
Router.get('/info', function (req, res) {
  return res.json({code: 1})
})

module.exports = Router