import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getRedirectPath } from '../util/util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const SET_USERINFO = 'SET_USERINFO'
const LOGOUT = 'LOGOUT'
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
    case LOGOUT:
      return {...initState, isAuth: false, redirectTo: '/login'}
    default:
      return state
  }
}

function errorMsg(msg) {
  Toast.fail(msg, 1)
  return {msg, type: ERROR_MSG}
}

function authSuccess(obj) {
  localStorage.setItem('userInfo', JSON.stringify(obj))
  return {payload: obj, type: AUTH_SUCCESS}
}

export function userinfo() {
  return dispatch => {
    // 获取用户信息
    let data = JSON.parse(localStorage.getItem('userInfo'))
    if (data._id) {
      dispatch(authSuccess(data))
    } else {
      axios.get('/user/info').then((res) => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            dispatch(authSuccess(res.data.data))
          } else {
            this.props.history.push('/login')
          }
        }
      })
    }

  }
}

export function login({user, password}) {
  if (!user || !password) {
    return errorMsg('缺少必填项')
  }
  return dispatch => {
    axios.post('/user/login', {user, password}).then((res) => {
      if (res.status === 200 && res.data.code === 200) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function logout() {
  console.log('logout')
  localStorage.clear()
  // return { type: LOGOUT }
  return dispatch => {
    dispatch({ type: LOGOUT })
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
    axios.post('/user/register', {user, password, type}).then((res) => {
      console.log(res, 'res')
      if (res.status == 200 && res.data.code === 200) {
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
      if (res.status == 200 && res.data.code === 200) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

