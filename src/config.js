import axios from 'axios'
// import {Toast} from 'antd-mobile'
import { logout } from './redux/user'

axios.interceptors.request.use(function (config) {
  // Toast.loading('加载中')
  //
  console.log('request 拦截请求')
  return config
})

axios.interceptors.response.use(function (res) {
  // Toast.loading('加载中')
  if (res.code === 400) {
    // 重新登录
    logout()
  }
  console.log(res)
  console.log('response 拦截响应')
  return res
})
