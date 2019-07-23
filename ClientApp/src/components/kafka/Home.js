import React, { Component } from 'react'
import Pane from '../ManagementWindow'
import Settings from './Settings'
import Groups from './Groups/Groups'

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Pane title='Kafka' settings={Settings}>
          <Groups />
        </Pane>
      </React.Fragment>
    )
  }
}
