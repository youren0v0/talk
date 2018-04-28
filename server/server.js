const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.listen(9233,function(){
  console.log('Node app start at port 9233')
})




// 启动：nodemon server
