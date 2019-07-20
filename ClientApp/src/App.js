import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import Docker from './components/docker/Home'
import Kafka from './components/kafka/Home'

export default class App extends Component {
  static displayName = App.name

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/docker' component={Docker} />
        <Route exact path='/kafka' component={Kafka} />
      </Layout>
    )
  }
}
