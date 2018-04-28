import React from 'react'
import logoImg from '../assets/img/logo.png'
import '../assets/css/style.less'
class Logo extends React.Component{
  render() {
    return (
      <div className="logo_box">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}

export default Logo