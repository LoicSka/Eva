import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import LanguageSelectfield from '../containers/LanguageSelectfield'

class NavbarItem extends Component {
  render() {
    const { translate } = this.props
    return (
      <div className='d-flex flex-row justify-content-end align-items-center'>
          <Link to='/login' className='btn nav-btn btn-default bordered mr-1 mr-sm-2'>{translate('userActions.login')}</Link>
          <Link to='/signup' className='btn btn-primary nav-btn ml-1 ml-sm-2'>{translate('userActions.signup')}</Link>
          {/* <LanguageSelectfield /> */}
      </div>
    )
  }
}

export default NavbarItem