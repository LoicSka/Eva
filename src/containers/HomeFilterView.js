import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

class HomeFilterView extends Component {
  render() {
    return (
      <div style={{backgroundColor: 'white', display: 'flex'}}>
        <h1>Here</h1>
        <h1>Here</h1>
        <h1>Here</h1>
      </div>
    )
  }
}

export default HomeFilterView;