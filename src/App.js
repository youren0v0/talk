import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd-mobile';
import axios from 'axios'
import { connect } from 'react-redux'
import { demo } from './react/action'

// 这种写法因为用了babel-plugin-transform-decorators-legacy
// 等于 let App = connect(省略)(App)
@connect(
  state =>({num: state}),
  { demo }
)
class App extends Component {
  componentDidMount() {
    console.log(this.props)
    axios.get('/at').then((res) => {
      console.log(res, 'res~~~~~~')
    })
  }
  render() {
    return (
      <div className="App">
        <Button></Button>
      </div>
    );
  }
}




export default App
//connect 把state和action给到props上