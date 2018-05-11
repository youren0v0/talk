import React from 'react'
import AvatarSelector from '@/component/avatarSelector'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { update } from '@/redux/user'
import { Redirect } from 'react-router-dom'
// 这种写法因为用了babel-plugin-transform-decorators-legacy
// 等于 let App = connect(省略)(App)
// connect 把state和action给到props上
@connect(
  state=>state.user,
  {update}
)
class BossInfo extends React.Component{
  state = {}
  changeInput (key, value) {
    this.setState({[key]: value})
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    const inputData = [
      {
        title: '招聘职位',
        key: 'title',
        placeholder: '请输入招聘职位'
      }, {
        title: '公司名称',
        key: 'company',
        placeholder: '请输入公司名称'
      }, {
        title: '职位薪资',
        key: 'money',
        placeholder: '请输入职位薪资'
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
        <NavBar mode="dark">Boss完善信息</NavBar>
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
          title='职位要求'
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

export default BossInfo

