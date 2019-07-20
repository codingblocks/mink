import React, { Component } from 'react'
import Pane from './ComponentPane'
import DockerStatus from './docker/DockerStatus'

export class Home extends Component {
  static displayName = Home.name

  render () {
    return (
      <>
        <p>Home!</p>
      </>
    )
  }
}
