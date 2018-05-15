import React from 'react'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '@/redux/user'
import {Redirect} from 'react-router-dom'
import {Result, List, Brief, WhiteSpace, Modal} from 'antd-mobile'

@connect(
  state=>state.user,
  { logoutSubmit }
)
class User extends React.Component{
  state = {}
  logout(){
    console.log(this.props, '~~~~~~~~~~~~~~~~``')
    let that = this
    Modal.alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid')
        that.props.logoutSubmit()
      }}
    ])
  }
  render() {
    const props = this.props
    console.log(this.props, '~~~props')
    const Item = List.Item
    const Brief = Item.Brief
    // 这判断真是一种神奇的写法，感觉容错率很低啊
    // TODO 应该把路由都抽出去比较好吧，这么放在主体文件里好难受
    // TODO 没有什么钩子可以完成这个任务么?
    return props.user ? (
      <div>
        <Result
          img = {<img src={require(`@/assets/img/portrait/${props.avatar}.png`)} style={{width:50}} alt="" />}
          title={props.user}
          message={props.type=='boss' ? props.company : null}
        />

        <List renderHeader={()=>'简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>薪资:{props.money}</Brief>:null}
          </Item>

        </List>
        <List>
          <Item onClick={() => this.logout()}>退出登录</Item>
        </List>
      </div>

    ) : <Redirect to={props.redirectTo} />
  }
}

export default User