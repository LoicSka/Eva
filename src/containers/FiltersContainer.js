import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FiltersContainer extends Component {
  render() {
    const { children } = this.props
    return (
      <div className='filter-nav-ctn'>
        <div className='filter-nav-content'>
          {children}
        </div>
      </div>
    )
  }
}

export default FiltersContainer