import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getRedirectPath } from '../util/util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const initState={
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  password: '',
  type: ''
}


export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload}
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case ERROR_MSG:
      return {...state, msg: action.msg, isAuth: false}
    default:
      return state
  }

}

function errorMsg(msg) {
  Toast.fail(msg, 1)
  return {msg, type: ERROR_MSG}
}

function loginSuccess(payload) {
  console.log('loginSuccess')
  return {payload, type: LOGIN_SUCCESS}
}
function registerSuccess(payload) {
  console.log('registerSuccess')
  return {payload, type: REGISTER_SUCCESS}
}
export function login({user, password}) {
  if (!user || !password) {
    return errorMsg('缺少必填项')
  }
  return dispatch => {
    console.log('dispatch', {user, password})
    axios.post('/user/login', {user, password}).then((res) => {
      console.log(res, 'res')
      if (res.status == 200 && res.data.code === 0) {
        dispatch(loginSuccess({user, password}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}

export function register({type, user, password, password2}) {
  if (!user || !password || !type) {
    return errorMsg('缺少必填项')
  }
  if (password2 !== password) {
    return errorMsg('两次输入密码不同')
  }
  return dispatch => {
    console.log('dispatch', {user, password, type})
    axios.post('/user/register', {user, password, type}).then((res) => {
      console.log(res, 'res')
      if (res.status == 200 && res.data.code === 0) {
        dispatch(registerSuccess({user, password, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}

