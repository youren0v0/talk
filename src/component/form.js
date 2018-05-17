import React from 'react'

export default function form(Comp){
  return class WrapperComp extends React.Component{
    state = {}
    changeInput (key, value) {
      this.setState({[key]: value})
    }
    render() {
      return (
        <Comp changeInput={() => this.changeInput} state={this.state} {...this.props}></Comp>
      )
    }
  }
}

