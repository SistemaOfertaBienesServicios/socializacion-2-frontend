import React, { Component, Suspense, Fragment } from 'react'
import { Router, Redirect, navigate, createHistory } from '@reach/router'
import store from 'store'
import Loading from 'components/loading'
import Topbar from 'components/topbar'
import HomePage from 'views/home'
import ProductTable from 'views/list'
import CreateProductTable from 'views/products/create'
import QuotationList from 'views/quotation/list'

// @ts-ignore
const history = createHistory(window)

/**
 * @typedef {import('@reach/router').RouteComponentProps} Props
 * @extends {Component<Props>}
 */
class App extends Component {
  componentDidMount () {
    if (!store.get('role')) {
      navigate('/login')
      return
    }

    this.unsubscribeHistory = history.listen(() => {
      if (!store.get('role')) {
        navigate('/login')
      }
    })
  }

  componentWillUnmount () {
    if (this.unsubscribeHistory) {
      this.unsubscribeHistory()
    }
  }

  render () {
    if (!store.get('role')) {
      return null
    }

    return (
      <Fragment>
        <Topbar />
        <div id='app-content'>
          <Suspense fallback={<Loading />}>
            <Router>
              <Redirect noThrow from='/' to='/home' />
              <HomePage path='home' />
              <ProductTable path='list' />
              <CreateProductTable path='products' />
              <QuotationList path='quotations' />
            </Router>
          </Suspense>
        </div>
      </Fragment>
    )
  }
}

export default App
