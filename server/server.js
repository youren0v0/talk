const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const app = express()
// socket work with express
const server = require('http').createServer(app)
const io = require('socket.io')(server)
// 解决跨域问题
io.listen(12312)
io.on('connection', function(socket){
  socket.on('chat', function (data) {
    console.log('socket.on chat')
    io.emit('chat2client',data)
  });
  socket.on('disconnect', function () {
    console.log(' socket.on disconnect')
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.listen(9233,function(){
  console.log('Node app start at port 9233')
})




// 启动：nodemon server
