import React, { Component } from 'react'
import * as signalR from '@aspnet/signalr'
import styled from 'styled-components'

const TerminalWindow = styled.div`
  width: 100%
  height: 400px
  overflow: auto
`

export default class Terminal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sendKey: props.method,
      recieveKey: `${props.method}-${props.id}`,
      connection: new signalR.HubConnectionBuilder().withUrl('/stream').build()
    }
  }

  componentDidMount () {
    const terminal = new window.Terminal()
    window.Terminal.applyAddon(fit)
    terminal.open(this.refs.terminal)
    terminal.fit() // TODO could maybe do this on resize too?
    const { connection, recieveKey, sendKey } = this.state

    connection
      .start()
      .then(() => {
        connection.on(recieveKey, message => {
          terminal.write(message)
        })

        connection.invoke(sendKey, this.props.id)
      })
      .catch(err => alert(`An error occured: ${err.toString()}`))
  }

  async componentWillUnmount () {
    fetch(`/api/streams/kill/${this.state.recieveKey}`, { method: 'DELETE' })
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
