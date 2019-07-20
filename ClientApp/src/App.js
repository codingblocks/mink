import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { Docker } from './components/Docker'

export default class App extends Component {
  static displayName = App.name

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/docker' component={Docker} />
      </Layout>
    )
  }
}
