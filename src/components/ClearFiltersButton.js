import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { clearFilters } from '../actions'
import { keys } from 'lodash'

class ClearFiltersButton extends Component {

  render() {
    const { translate, clearFilters, filter: { filters } } = this.props
    return (
      <button onClick={clearFilters} className={classnames('btn sub-nav-btn', { 'active': keys(filters).length !== 0})}>
        {translate('subNav.clear')}
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  const { filter } = state
  return {
    translate: getTranslate(state.locale),
    filter,
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps, { clearFilters })(ClearFiltersButton)

