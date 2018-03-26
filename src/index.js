import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore, applyMiddleware, compose } from 'redux'
// applyMiddleware启动中间件
// compose 用来组合函数
// thunk 可让action使用异步
import thunk from 'redux-thunk'
import counter from './react/action'
import App from './App'
import { Provider } from 'react-redux'
// Provider组件，可以让容器组件拿到state。
import registerServiceWorker from './registerServiceWorker'


const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : function () {}

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevtools
))


ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('root')
)
registerServiceWorker()
