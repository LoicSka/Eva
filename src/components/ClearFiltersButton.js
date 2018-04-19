import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import lowerCase from 'lodash/lowerCase'
import MainNavBar from '../containers/MainNavBar';
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

class ClearFiltersButton extends Component {
  render() {
    const { translate } = this.props
    return (
      <button className='btn sub-nav-btn'>
        {translate('subNav.clear')}
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps)(ClearFiltersButton)

