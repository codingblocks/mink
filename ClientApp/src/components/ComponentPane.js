import React, { Component } from 'react'

export default class ComponentPane extends Component {
  static defaultProps = {
    title: 'No title'
  }
  render () {
    return (
      <div className='container border shadow-sm p-3 mb-1 bg-light rounded'>
        <h2>{this.props.title}</h2>
        <div>{this.props.children}</div>
      </div>
    )
  }
}
