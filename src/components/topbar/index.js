// Libraries
import React, { Component } from 'react'
import store from 'store'
import { Link, Location } from '@reach/router'


const User = ({ user }) => {
  return (
    <div className='navbar-item has-dropdown is-hoverable'>
      <span className='navbar-link is-hidden-touch'>
        <span className='icon'>
          <i className='mdi mdi-account' />
        </span>
        <span>{user}</span>
      </span>
      <div className='navbar-dropdown'>
        <Link to='/login' className='navbar-item' onClick={store.clearAll}>
          <span className='icon'>
            <i className='mdi mdi-logout' />
          </span>
          <span>Salir</span>
        </Link>
      </div>
    </div>
  )
}

class Topbar extends Component {
  constructor (props) {
    super(props)
    const { token } = store.get('token') ||  'Anonimous.Anonimous'
    console.log(token)
    this.state = {
      user: token.split(".")[0],
      type: token.split(".")[1],
      isMenuOpen: false
    }
    this.routes = [
      { route: '/home', label: 'Home', canSee: ['client', 'provider', 'all'] }
    ]
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }))
  }

  getRoutes () {
    const { type } = this.state
    return this.routes.filter(route => {
      return route.canSee.includes('all') || route.canSee.includes(type)
    })
  }

  render () {
    const { isMenuOpen, user } = this.state
    const ROUTES = this.getRoutes()
    return (
      <Location>
        {({ location }) => (
          <nav id='app-topbar' className='navbar is-fixed-top is-dark is-bold'>
            <div className='navbar-brand'>
              <div
                className={`navbar-burger ${isMenuOpen ? 'is-active' : ''}`}
                data-target='navMenu'
                onClick={this.toggleMenu}
                role='button'
                tabIndex={0}
                onKeyDown={this.toggleMenu}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            <div
              id='navMenu'
              className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}
            >
              <div className='navbar-start'>
                {ROUTES.map(({ route, label }) => (
                  <Link
                    key={label}
                    className={`navbar-item ${
                      location.pathname.startsWith(route) ? 'is-active' : ''
                    }`}
                    to={route}
                    onClick={this.toggleMenu}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className='navbar-end'>
                <User user={user} />
              </div>
            </div>
          </nav>
        )}
      </Location>
    )
  }
}

export default Topbar
