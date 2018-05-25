import React from 'react'
import { connect } from 'react-redux'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { getMsgList, sendMsg } from '@/redux/chat'
import from from '@/component/from'
import io from 'socket.io-client'
const socket = io('ws://localhost:12312')

@connect(
  state => state.user,
  { getMsgList, sendMsg }
)
@from
class Chat extends React.Component{
  state = {}
  componentDidMount () {
    console.log(socket)
    socket.on('chat2client', (data) => {
      console.log(data);
      let arr = this.state.chatList || []
      arr.push(data.chat)
      this.changeInput('chatList', arr)
    })
  }
  changeInput (key, value) {
    this.setState({[key]: value})
  }
  chat() {
    this.props.sendMsg(this.props.match.params.id, this.state)
    socket.emit('chat', this.props.user)
  }
  render() {
    let userName = this.props.match.params.id
    return (
      <div>
        {userName}
        {(this.state.chatList ? this.state.chatList : []).map((v, index) => {
          return (<div key={index}>{v}</div>)
        })}
        <InputItem onChange={(value) => this.changeInput('chat', value)}>{'chat'}</InputItem>
        <Button onClick={() => this.chat()}></Button>
      </div>

    )
  }
}

export default Chat