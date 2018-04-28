import axios from 'axios'
// import {Toast} from 'antd-mobile'

axios.interceptors.request.use(function (config) {
  // Toast.loading('加载中')
  console.log('request 拦截请求')
  return config
})

axios.interceptors.response.use(function (config) {
  // Toast.loading('加载中')
  console.log('response 拦截响应')
  return config
})