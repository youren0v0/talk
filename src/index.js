import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/style.less'
import './config'
import { createStore, applyMiddleware, compose } from 'redux'
// applyMiddleware启动中间件
// compose 用来组合函数
// thunk 可让action使用异步
import thunk from 'redux-thunk'
// import counter from './react/action'
import reducers from './reducers'
import { Provider } from 'react-redux'
// Provider组件，可以让容器组件拿到state。
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : function () {}
))


ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
    
  </Provider>),
  document.getElementById('root')
)
registerServiceWorker()