const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'password':0,'__v':0}

Router.get('/list', function (req, res) {
  const { type } = req.query
  User.find({type}, function (err, doc) {
    return res.json({code: 0,data: doc})
  })
})
// TODO 前端请求了两次login，还有一次get的？？？哪里发的？？？
Router.post('/login', function(req, res){
  const {user, password} = req.body
  User.findOne({user}, function(err,doc){
    if (doc) {
      if (doc.password !== md5Pwd(password)) {
        return res.json({code: 401, msg:'密码错误'})
      }
      let id = doc['_id']
      res.cookie('userid', id)
      return res.json({code: 200, msg:'登录成功', data: deletePassword(doc)})
    } else {
      return res.json({code: 401, msg:'用户不存在'})
    }
  })
})
Router.post('/register', function(req, res){
  const {user, password, type} = req.body
  User.findOne({user},function(err,doc){
    if (doc) {
      return res.json({code: 400,msg:'用户名重复'})
    }
    User.create({user, password: md5Pwd(password), type}, function (err, doc) {
      if (err) {
        return res.json({code: 400, msg: '后端出错了'})
      }
      let id = doc['_id']
      res.cookie('userid', id)
      return res.json({code: 200, msg: '注册成功', data: deletePassword(doc)})
    })
  })
})
Router.post('/update', function(req, res){
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 401, msg: 'uid失效'})
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code: 200, msg: '更新成功', data})
  })
})

function md5Pwd(password) {
  const salt = 'my_react_demo'
  return utils.md5(utils.md5(password + salt))
}

Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function(err, doc){
    if (err) {
      return res.json({code: 400, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 200, data: deletePassword(doc)})
    }
  })
})

// function deletePassword(obj) {
//   // TODO 直接从库里搜出的obj里面有一堆原型上的东西，最下方两种方法都去不掉，结构赋值和转json可以暴力解决。不知道原型链上有没有提供'正常'解决方案
//   let {user, type, avatar, company, desc, money, title} = obj
//   return {user, type, avatar, company, desc, money, title}
// }
function deletePassword(obj) {
  let res = Object.keys(JSON.parse(JSON.stringify(obj))).reduce((acc, cur) => {
    if (cur !== 'password') {
      acc[cur] = obj[cur]
    }
    return acc
  }, {})
  console.log(JSON.stringify(obj), res)
  return res
}

// function deletePassword(obj) {
//   console.log(obj, '~~~~~~obj')
//   let newObj = {}
//   for (let key in obj) {
//     if (key === 'password') {
//       console.log('这里找到了为什么下面删不掉？')
//     }
//     if (key !== 'password') {
//       newObj[key] = obj[key]
//     }
//   }
//   console.log(newObj, '~~~~~~newObj')
//   return newObj
// }
// function deletePassword(obj) {
//   delete obj.password
//   console.log(obj)
//   return obj
// }


Router.get('/getmsglist',function(req,res){
  const user = req.cookies.userid

  User.find({},function(e,userdoc){
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if (!err) {
        return res.json({code: 200, msgs: doc, users: users})
      }
    })

  })
  // {'$or':[{from:user,to:user}]}

})
module.exports = Router