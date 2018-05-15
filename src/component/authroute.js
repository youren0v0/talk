import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter

class AuthRoute extends React.Component{
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname)>-1) {
      return null
    }

  }
  render() {
    return (
      <div>
      </div>
    )
  }
}
export default AuthRoute
