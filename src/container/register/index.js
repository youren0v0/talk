import React from 'react'
import Logo from '../../component/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user'
import { Redirect } from 'react-router-dom'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile'

// 这种写法因为用了babel-plugin-transform-decorators-legacy
// 等于 let Register = connect(省略)(Register)
@connect(
  state => state.user,
  { register }
)

class Register extends React.Component{
  // TODO 不懂，为什么这样可以提高性能？6-2 15:45
  // 这种写法据说可以提高性能，箭头函数会每次传入新的对象。
  // constructor(props) {
  //   super(props)
  //   this.register = this.register.bind(this)
  //   //  onClick={this.register}
  // }
  state = {
    type: 0
  }
  changeRadio(name) {
    this.setState({type: name})
  }
  changeInput (key, value) {
    this.setState({[key]: value})
  }
  toRegister () {
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    const inputData = [
      {
        title: '用户名',
        key: 'user',
        placeholder: '请输入用户名'
      }, {
        title: '密码',
        key: 'password',
        placeholder: '请输入密码'
      }, {
        title: '确认密码',
        key: 'password2',
        placeholder: '请再次输入密码'
      }
    ]
    const radioData = [{
      key: '1',
      name: 'genuis'
    }, {
      key: '2',
      name: 'boss'
    }]
    let inputList = inputData.map((item) => {
      return (
        <InputItem key={item.key} onChange={(value) => this.changeInput(item.key, value)} placeholder={item.placeholder}>{item.title}</InputItem>
      )
    })
    let radioList = radioData.map((item) => {
      return (
        <RadioItem key={item.key} onChange={() => this.changeRadio(item.key)} checked={this.state.type === item.key}>
          {item.name}
        </RadioItem>
      )
    })
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : ''}
        <Logo />
        <List>
          {inputList}
          {radioList}
          <Button type="primary" onClick={() => this.toRegister()}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register