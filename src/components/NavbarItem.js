import React, { Component } from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'


class NavbarItem extends Component {
  render() {
    return (
      <div className= "nav-item-ctn">
        <ul className="nav">
          <li>
            <Link to="/get-started" className="nav-item nav-link mr-sm-3">Help</Link>
          </li>
          <li>
            <Link to="/get-started" className="nav-item nav-link mr-sm-3">Login</Link>
          </li>
          <li>
            <Link to="/get-started" className="btn btn-primary mr-sm-4">Sign up</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavbarItem