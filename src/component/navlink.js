
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import '@/assets/css/style.less'
@withRouter
class NavLinkBar extends React.Component{
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	render(){
		
		const navList = this.props.data.filter(v=>!v.hide)
		const {pathname} = this.props.location
		return (
			<div className='nav'>
				<TabBar >
					{navList.map(v=>(
						<TabBar.Item
							key={v.path}
							title={v.text}
							icon={{uri: require(`@/assets/img/navlink/${v.icon}.png`)}}
							selectedIcon={{uri: require(`@/assets/img/navlink/${v.icon}-active.png`)}}
							selected={pathname===v.path}
							onPress={()=>{
							this.props.history.push(v.path)
						}}
						>

						</TabBar.Item>
					))}
				</TabBar>
			</div>

		)
	}
}

export default NavLinkBar