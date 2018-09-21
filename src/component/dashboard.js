import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import Boss from '@/container/boss'
import Genius from '@/container/genius'
import User from '@/container/user'
import Msg from '@/container/msg'
import NavLinkBar from '@/component/navlink'

@connect(
  state=>state
)
class Dashboard extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        hide: user.type=='2',
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius
      },
      {
        hide: user.type=='1',
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>

        <NavLinkBar data={navList} ></NavLinkBar>

      </div>
    )
  }
}
// 这是嵌套了一套子路由
export default Dashboard