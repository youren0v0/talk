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
    'chatid':{'type': String, require: true},
    'from':{'type': String,'require': true},
    'to':{'type': String,'require': true},
    'read':{'type': Boolean,default: false},
    'content':{'type': String,'require':true,'default': ''},
    'create_time':{'type': Number,'default': Date.now}
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
  // 在 Mongoose 中，所有数据都由一个 Schema 开始创建。每一个 schema 都映射到一个 Mongodb 的集合(collection)，并定义了该集合(collection)中的文档(document)的形式。

}
module.exports = {
  getModel: function(name){
    return mongoose.model(name)
    // 为Model 创建实例方法供Model 实例调用
  }
}
