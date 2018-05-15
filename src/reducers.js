// 合并reducer并返回
import { combineReducers } from 'redux'
import { user } from './redux/user'
import { chatuser } from './redux/chatuser'

export default combineReducers({user, chatuser})