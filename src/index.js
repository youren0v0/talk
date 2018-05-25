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
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Login from '@/container/login'
import Register from '@/container/register'
import BossInfo from '@/container/bossInfo'
import GeniusInfo from '@/container/geniusInfo'
import Chat from '@/container/chat'
import Dashboard from '@/component/dashboard'

import AuthRoute from '@/component/authroute'
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : function () {}
))


ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:id" component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>

  </Provider>),
  document.getElementById('root')
)
registerServiceWorker()