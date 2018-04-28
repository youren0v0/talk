// 合并reducer并返回
import { combineReducers } from 'redux'
import { user } from './redux/user'

export default combineReducers({user})