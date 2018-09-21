import React from 'react'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { logout, userinfo } from '@/redux/user'
import {Result, List, Brief, Modal} from 'antd-mobile'

@connect(
  state=>state.user,
  { logout, userinfo }
)
class User extends React.Component{
  state = {}
  componentDidMount() {
    console.log('componentDidMount')
    this.props.userinfo()
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  logout(){
    // this.props.logout()
    let that = this
    Modal.alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid')
        that.props.logout()
        that.props.history.push('/login')
      }}
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return (
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
    )
  }
}

export default User