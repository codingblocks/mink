import React, { Component } from 'react'
import * as signalR from '@aspnet/signalr'
import styled from 'styled-components'

const TerminalWindow = styled.div`
  width: 100%
  height: 400px
  overflow: auto
`

export default class Terminal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendKey: props.method,
      processKey: `${props.method}-${props.id}`,
      readConnection: new signalR.HubConnectionBuilder().withUrl('/stream').build(),
      writeConnection: new signalR.HubConnectionBuilder().withUrl('/stream').build(),
    }
  }

  componentDidMount() {
    const terminal = new window.Terminal()
    window.Terminal.applyAddon(fit)
    terminal.open(this.refs.terminal)
    terminal.fit() // TODO could maybe do this on resize too?

    const { readConnection, writeConnection, processKey, sendKey } = this.state

    readConnection
      .start()
      .then(() => {
        readConnection.on(processKey, message => {
          terminal.write(message + '\r\n')
        })

        readConnection.invoke(sendKey, this.props.id)
      })
      .catch(err => alert(`An error occured: ${err.toString()}`))

    writeConnection
      .start()
      .then(() => {
        terminal.write('\n$ ');
        terminal.on('key', input => {
          //connection.invoke('Write',processKey,key }).then(() => {
          writeConnection.invoke('Write', this.props.id, input).then(() => {
            if (input.charCodeAt(0) === 13)
              terminal.write('\n');
            terminal.write(input);
          }).catch(e => {
            console.log(e)
          })
        })
      });

  }

  async componentWillUnmount() {
    fetch(`/api/streams/kill/${this.state.processKey}`, { method: 'DELETE' })
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
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