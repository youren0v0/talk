import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore, applyMiddleware, compose } from 'redux'
// applyMiddleware启动中间件
// compose 用来组合函数
// thunk 可让action使用异步
import thunk from 'redux-thunk'
// import counter from './react/action'
import reducers from './reducers'
import App from './App'
import { Provider } from 'react-redux'
// Provider组件，可以让容器组件拿到state。
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Login from './container/login'
import Register from './container/register'
import BossInfo from './container/bossInfo'
import GeniusInfo from './container/geniusInfo'
import AuthRoute from './component/authroute'
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : function () {}
))


ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path="/bossinfo" component={BossInfo}></Route>
        <Route path="/geniusinfo" component={GeniusInfo}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>

      </div>
    </BrowserRouter>

  </Provider>),
  document.getElementById('root')
)
registerServiceWorker()
/*    <App />*/