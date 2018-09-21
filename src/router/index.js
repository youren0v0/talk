
import React from 'react'
import {connect} from 'react-redux'
import { Route, Switch, withRouter} from 'react-router-dom'
import Login from '@/container/login'
import Register from '@/container/register'
import BossInfo from '@/container/bossInfo'
import GeniusInfo from '@/container/geniusInfo'
import Chat from '@/container/chat'
import Dashboard from '@/component/dashboard'
import AuthRoute from '@/component/authroute'
import { userinfo } from '@/redux/user'
@connect(
  state=>state,
  {userinfo}
)
@withRouter
class Router extends React.Component{
  render() {
    console.log(this.props)
    this.props.history.listen(location => {
      console.log(location.pathname, '~~~~~~~~~~~')
      console.log(location.pathname !== '/login', '~~~~~~~~~~~')
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        this.props.userinfo()
      }
      // pathname !== '/login' || '/register', 去查找location的userinfo,没有就请求，请求的时候由后端判断登录是否失效

    })
    return (
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:id" component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}

export default Router


