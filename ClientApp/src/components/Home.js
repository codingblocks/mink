import React, { Component } from 'react'
import Links from './Links'
import Pane from './ComponentPane'
import DockerStatus from './DockerStatus'

export class Home extends Component {
  static displayName = Home.name

  render () {
    return (
      <div>
        <Pane title='Docker Status'>
          <DockerStatus />
        </Pane>

        <Pane title='Handy Links'>
          <Links />
        </Pane>
      </div>
    )
  }
}
