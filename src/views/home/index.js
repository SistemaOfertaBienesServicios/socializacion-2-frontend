// Libraries
import React, { Component, Fragment } from 'react'
import { navigate } from '@reach/router'
import store from 'store'

/**
 * @typedef {import('@reach/router').RouteComponentProps} RouterProps
 * @extends {Component<RouterProps>}
 */
class HomePage extends Component {
  render () {
    const {token} = store.get('token')
    const isProvider = token.split(".")[1] !== 'Cliente' 
    return (
      <div className='section'>
        
        
        <div className='flex-between'>
          <h1 className='title'>Cotización</h1>
        </div>

        <div style={{ display: "flex",flexDirection: "row"}}>
          <div style={{width: '15%', height: '15%', marginRight:'2rem', marginBottom: '2rem'}} className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="https://cdn2.iconfinder.com/data/icons/picons-essentials/71/new-512.png" alt="Placeholder image"/>
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Crear cotizaciones</p>
                </div>
              </div>

              <div className="content">
                <a onClick={() => navigate('/list')} className="button is-medium is-fullwidth is-success">Ir</a>
              </div>
            </div>
          </div>

          {isProvider && (
            <Fragment>
              <div style={{width: '15%', height: '15%', marginRight:'2rem', marginBottom: '2rem'}} className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src="https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/search-512.png" alt="Placeholder image"/>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">Ver cotizaciónes</p>
                    </div>
                  </div>

                  <div className="content">
                    <a onClick={() => navigate('/quotations')} className="button is-medium is-fullwidth is-success">Ir</a>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          
        </div>
        
        {isProvider && (
          <Fragment>
            <div className='flex-between'>
              <h1 className='title'>Productos</h1>
            </div>

            <div style={{maxWidth: '15%', maxHeight: '15%'}} className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://cdn1.iconfinder.com/data/icons/streamline-content/60/cell-18-8-480.png" alt="Placeholder image"/>
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Registrar Producto</p>
                  </div>
                </div>

                <div className="content">
                  <a onClick={() => navigate('/products')} className="button is-medium is-fullwidth is-success">Ir</a>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        

      </div>
    )
  }
}

export default HomePage
