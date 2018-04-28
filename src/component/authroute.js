import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter
class AuthRoute extends React.Component{
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname)>-1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then((res) => {
      if (res.status == 200) {
        console.log(res)
        if (res.data.code == 0) {
          // 有登录信息的
        } else {
          console.log(this.props.history, 'history')
          this.props.history.push('/login')
        }
        console.log(res.data)
      }
    })
    // 是否登录
    // 用户的身份 type
    // 用户是否完善信息
    // 现在的url 是否和当前相同
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}
export default AuthRoute
