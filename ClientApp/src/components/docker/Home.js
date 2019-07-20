import React, { Component } from 'react'
import Pane from '../ManagementWindow'
import DockerStatus from './DockerStatus'

export default class Home extends Component {
  static displayName = Home.name

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
