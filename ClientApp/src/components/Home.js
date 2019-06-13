import React, { Component } from 'react'
import Pane from './ComponentPane'
import DockerStatus from './DockerStatus'

export class Home extends Component {
  static displayName = Home.name

  render () {
    return (
      <>
        <Pane title='Docker Status'>
          <DockerStatus />
        </Pane>
      </>
    )
  }
}
