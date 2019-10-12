// Libraries
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

/**
 * @typedef {import('@reach/router').RouteComponentProps} RouterProps
 * @extends {Component<RouterProps>}
 */
class ErrorPage extends Component {
  render () {
    const {
      title = 'Error 404',
      errorCode = '404',
      errorMessage = 'Error desconocido'
    } =
      this.props.location && this.props.location.state
        ? this.props.location.state
        : {}

    return (
      <DocumentTitle title={title}>
        <div id='page-login'>
          <div className='login-content'>
            <hr />
            <div className='content'>
              <h1 className='title'>Hubo un error</h1>
              <p className='subtitle'>
                Error
                {' '}
                {errorCode}
                <br />
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default ErrorPage
