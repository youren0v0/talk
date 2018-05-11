import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  state = {}
  render() {
    let avatarName = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
    const avatarList = avatarName.split(',').map(v => {
      return {
        icon: require(`@/assets/img/portrait/${v}.png`),
        text: v
      }
    })
    const gridHeader = this.state.icon ? (
      <div>
        <span>已选择头像</span>
        <img style={{width:20}} src={this.state.icon} alt=""/>
      </div>
    ) : '请选择头像'
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
// 这么写也行
// AvatarSelector.propTypes = {
//   selectAvatar: PropTypes.func.isRequired
// }
export default AvatarSelector

// require
// 和 ES6 的 import 基本是一个意思
// 以下两个完全相同，神奇
// const avatar = require('@/assets/image/avatar.jpg')
// import avatar from '@/assets/image/avatar.jpg'