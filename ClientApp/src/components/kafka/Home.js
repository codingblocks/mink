import React, { Component } from 'react'
import Pane from '../ManagementWindow'
import Settings from './Settings'

export default class Home extends Component {
  render() {
    return (
      <>
        <Pane title='Kafka' settings={Settings}>

        </Pane>
      </>
    )
  }
}
