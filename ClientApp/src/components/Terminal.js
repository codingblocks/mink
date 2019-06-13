import React, { Component } from 'react'
import * as signalR from '@aspnet/signalr'
import styled from 'styled-components'

const TerminalWindow = styled.div`
  width: 100%
  height: 400px
  overflow: auto
`

export default class Terminal extends Component {
  componentDidMount () {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/stream')
      .build()

    const terminal = new window.Terminal()
    window.Terminal.applyAddon(fit)
    terminal.open(this.refs.terminal)
    terminal.fit() // TODO could maybe do this on resize too
    connection
      .start()
      .then(() => {
        // recieve on "method-id"
        connection.on(`${this.props.method}-${this.props.id}`, message => {
          terminal.write(message)
        })

        // send on "method"
        connection.invoke(this.props.method, this.props.id)
      })
      .catch(err => console.error(err.toString()))
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <TerminalWindow
        ref='terminal'
        width='100%'
        height='400px'
        style={{ overflow: 'auto' }}
      />
    )
  }
}
