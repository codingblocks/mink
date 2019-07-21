import React, { Component } from 'react'
import ManagementWindow from '../ManagementWindow'
import DockerStatus from './DockerStatus'
import Settings from './Settings'

export default class Home extends Component {
  static displayName = Home.name

  render() {
    return (
      <>
        <ManagementWindow title='Docker' settings={Settings}>
          <DockerStatus />
        </ManagementWindow>
      </>
    )
  }
}
