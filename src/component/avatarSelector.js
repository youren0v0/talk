import React from 'react'
import {Grid, List} from 'antd-mobile'
class AvatarSelector extends React.Component{
  state = {}
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(v=>({
                          icon:require(`@/assets/img/${v}.png`),
                          text:v
                        }))
    const gridHeader = this.state.icon ? (
                          <div>
                            <span>已选择头像</span>
                            <img style={{width:20}} src={this.state.icon} alt=""/>
                          </div>) : '请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm=>{
                console.log(elm, 'elm')
                this.setState(elm)
                this.props.selectAvatar(elm.text)
              }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector

// require
// 和 ES6 的 import 基本是一个意思
// 以下两个完全相同，神奇
// const avatar = require('@/assets/image/avatar.jpg')
// import avatar from '@/assets/image/avatar.jpg'