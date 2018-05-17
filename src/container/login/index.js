import React from 'react'
import Logo from '@/component/logo'
import { connect } from 'react-redux'
import { login } from '@/redux/user'
import form from '@/component/form'
import { Redirect } from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

@connect(
  state => state.user,
  { login }
)
@form
class Login extends React.Component{
  goRegister() {
    this.props.history.push('./register')
  }
  toLogin () {
    this.props.login(this.props.state)
  }
  render() {
    const inputData = [
      {
        title: '用户名',
        key: 'user',
        placeholder: '请输入用户名'
      }, {
        title: '密码',
        key: 'password',
        placeholder: '请输入密码'
      }
    ]
    let inputList = inputData.map((item) => {
      return (
        <InputItem key={item.key} onChange={(value) => this.props.changeInput(item.key, value)} placeholder={item.placeholder}>{item.title}</InputItem>
      )
    })
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : ''}
        <Logo />
        <WingBlank>
          <List>
            {inputList}
          </List>
          <Button type="primary" onClick={() => this.toLogin()}>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.goRegister()}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login


