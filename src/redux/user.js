import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getRedirectPath } from '../util/util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
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
    case AUTH_SUCCESS:
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

function authSuccess(obj){
  // 这里是要把password删掉，不传
  const {password,...data} = obj
  return {payload: data, type: AUTH_SUCCESS}
}

export function userinfo() {
  return dispatch => {
    // 获取用户信息
    axios.get('/user/info').then((res) => {
      if (res.status == 200) {
        console.log(res)
        if (res.data.code == 0) {
          // 有登录信息的
        } else {
          console.log(this.props.history, 'history')
          this.props.history.push('/login')
        }
        console.log(res.data)
      }
    })
    // 是否登录
    // 用户的身份 type
    // 用户是否完善信息
    // 现在的url 是否和当前相同
  }

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
        console.log(res.data, 'data~~~~~~~~~~~')
        dispatch(authSuccess(res.data.data))
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
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then((res) => {
      console.log(res, 'res')
      if (res.status == 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}

