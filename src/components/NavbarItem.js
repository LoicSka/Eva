import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class NavbarItem extends Component {
  render() {
    return (
      <div className= 'nav-item-ctn'>
        <ul className='nav'>
          <li className='nav-item'>
            <Link to='/get-started' className='btn btn-outline-primary'>Login</Link>
          </li>
          <li className='nav-item'>
            <Link to='/get-started' className='btn btn-primary mr-sm-3'>Sign up</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavbarItem