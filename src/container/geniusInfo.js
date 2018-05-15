import React from 'react'
import AvatarSelector from '@/component/avatarSelector'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { update } from '@/redux/user'
import { Redirect } from 'react-router-dom'
@connect(
  state=>state.user,
  {update}
)
class GeniusInfo extends React.Component{
  state = {}
  changeInput (key, value) {
    this.setState({[key]: value})
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    const inputData = [
      {
        title: '求职岗位',
        key: 'title',
        placeholder: '请输入求职岗位'
      }
    ]
    let inputList = inputData.map((item) => {
      return (
        <InputItem key={item.key} onChange={(value) => this.changeInput(item.key, value)} placeholder={item.placeholder}>{item.title}</InputItem>
      )
    })
    return (
      <div>
        {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={(imgname)=>{
          this.setState({
            avatar:imgname
          })
        }}></AvatarSelector>
        {inputList}
        <TextareaItem
          onChange={(v)=>this.changeInput('desc',v)}
          rows={3}
          autoHeight
          title='个人见解'
        >
        </TextareaItem>
        <Button
          onClick={()=>{
						this.props.update(this.state)
					}}
          type='primary'>保存</Button>
      </div>

    )
  }
}

export default GeniusInfo