import React, { Component } from 'react'
import Pane from '../ManagementWindow'
import Settings from './Settings'
import Groups from './Groups/Groups'

export default class Home extends Component {
  render() {
    return (
      <>
        <Pane title='Kafka' settings={Settings}>
          <Groups />
        </Pane>
      </>
    )
  }
}
