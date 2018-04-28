/**
 * 操作数据库 启动：mongod --config /usr/local/etc/mongod.conf
 */
const mongoose = require('mongoose')
// 链接mongo
const DB_URL = 'mongodb://localhost:27017/talk'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongo success')
})

const models = {
  user: {
    'user': { type: String, require: true },
    'password': { type: String, require: true },
    'type': { 'type': String, 'require': true },
    // 头像
    'avatar': { 'type': String },
    // 个人简介
    'desc': { 'type': String },
    // 职位名
    'title': { 'type': String },
    // boss下的字段
    'company': { 'type': String },
    'money': { 'type': String }
  },
  chat: {
  // 聊天
  }
}

for(let m in models){
  // console.log(models, 'models')
  // console.log(m, 'models')
  mongoose.model(m, new mongoose.Schema(models[m]))
  // console.log(mongoose.model('user'))
}
module.exports = {
  getModel: function(name){
    // console.log(mongoose, 'mongoose')
    return mongoose.model(name)
  }
}
