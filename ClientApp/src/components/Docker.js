import React, { Component } from 'react'
import Pane from './ComponentPane'
import DockerStatus from './docker/DockerStatus'

export class Docker extends Component {
  static displayName = Docker.name

  render() {
    return (
      <>
        <Pane title='Docker Status'>
          <DockerStatus />
        </Pane>
      </>
    )
  }
}
