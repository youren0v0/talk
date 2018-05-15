import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'

class UserCard extends React.Component{
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  render(){
    const Header = Card.Header
    const Body = Card.Body
    console.log(this.props)
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>

        {this.props.userlist.map(v=>(
          v.avatar?(<Card key={v._id}>
            <Header
              title={v.user}
              thumb={require(`@/assets/img/portrait/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            <Body>
            {v.type=='2'? (
              <div>
                <div>公司:{v.company}</div>
                <div>简介:{v.desc}</div>
                <div>薪资:{v.money}</div>
              </div>
            ) :null}
            </Body>
          </Card>):null

        ))}

      </WingBlank>
    )


  }
}
export default UserCard

