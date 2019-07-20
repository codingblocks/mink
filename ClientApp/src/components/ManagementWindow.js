import React, { Component } from 'react'
import './ManagementPane.css'

export default class ManagementWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSettings: false
    }
  }

  static defaultProps = {
    title: 'No title',
    settings: null
  }

  showSettings() {
    this.setState({showSettings: true})
  }

  hideSettings() {
    this.setState({ showSettings: false })
  }

  render() {
    const Settings = this.props.settings
    return (
      <>
        <div className='container border shadow-sm p-3 mb-1 bg-light rounded'>
          <button className="btn btn-light settings-toggle"><span role="img" aria-label="{this.props.title} settings" onClick={this.showSettings.bind(this)} hidden={!this.props.settings}>⚙️</span></button>
          <h2>
            {this.props.title}
          </h2>
        
          <div>{this.props.children}</div>
        </div>
        <Settings showSettings={this.state.showSettings} onHide={this.hideSettings.bind(this)} />
      </>
    )
  }
}
