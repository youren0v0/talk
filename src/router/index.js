
import React from 'react'
import {connect} from 'react-redux'
import {Router, Route, Switch, withRouter} from 'react-router-dom'

import Dashboard from '@/component/dashboard'
import AuthRoute from '@/component/authroute'
import { userinfo } from '@/redux/user'
import config from './config'
@connect(
  state=>state,
  {userinfo}
)
@withRouter
class RouteWithConfig extends React.Component{
  state = {
    path: ''
  }
  render() {
    console.log('1111111111111')
    console.log(this.props)
    this.props.history.listen(location => {
      this.setState({
        path: location.pathname
      })
      console.log(location.pathname, '~~~~~~~~~~~')
      console.log(location.pathname !== '/login', '~~~~~~~~~~~')
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        this.props.userinfo()
      }
      // pathname !== '/login' || '/register', 去查找location的userinfo,没有就请求，请求的时候由后端判断登录是否失效

    })
    console.log(config, '=========config=========')
    let route = config.map((item) => {
      return (
        <Route path={item.path} component={item.component} key={item.path}></Route>
      )
    })
    return (
      <div>
        {/* <AuthRoute></AuthRoute>*/}
        <Switch>
          {route}
          <Route component={Dashboard}></Route>
        </Switch>
      </div>

    )
  }
}

export default RouteWithConfig


