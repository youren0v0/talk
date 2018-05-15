import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '@/redux/chatuser'
import UserCard from '@/component/userCard'
@connect(
  state=>state.chatuser,
  {getUserList}
)

class Boss extends React.Component{
  componentDidMount() {
    this.props.getUserList('1')
  }
  render() {

    return (
      <div>
        <UserCard userlist={this.props.userlist}></UserCard>
      </div>


    )
  }
}

export default Boss