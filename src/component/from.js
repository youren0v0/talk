import React from 'react'

export default function from(Comp){
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
      this.changeInput = this.changeInput.bind(this)
    }
    changeInput (key, value) {
      this.setState({[key]: value})
    }
    render() {
      return (
        <Comp changeInput={this.changeInput} state={this.state} {...this.props}></Comp>
      )
    }
  }
}

