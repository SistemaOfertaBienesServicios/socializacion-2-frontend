import React, { lazy, Suspense } from 'react'
import { Router } from '@reach/router'
import Loading from 'components/loading'

/**
 * Public Routes
 */
const Login = lazy(() => import('views/login'))
const ErrorPage = lazy(() => import('views/error'))

/**
 * Private pages, do require an active session
 */
const App = lazy(() => import('views'))

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Login path='/login' />
      <ErrorPage path='/error' />
      <App path='/*' />
    </Router>
  </Suspense>
)

export default Routes
