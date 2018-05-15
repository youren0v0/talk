import React from 'react'
import { connect } from 'react-redux'

@connect(
  state=>state,
  {}
)
class User extends React.Component{
  state = {}
  render() {
    return (
      <div>
        user
      </div>

    )
  }
}

export default User