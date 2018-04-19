import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hideFilterNav } from '../actions'

class HomeTutorListView extends Component {
  componentDidMount() {
    const { hideFilterNav } = this.props
    document.onkeydown = (evt) => {
      evt = evt || window.event
      var charCode = evt.keyCode || evt.which
      if (charCode === 27) {
        hideFilterNav()
      }
    }
  }
  render() {
    return (
      <div className="container" onClick={hideFilterNav} style={{ padding: 0, marginTop: '15px' }}>
        <div className="row justify-content-center">
          <div className="row col-md-10" style={{ background: 'red', height: '200px' }}>
          
          </div>
        </div>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  const { navigation: { isFilterNavHidden } } = state
  return {
    isFilterNavHidden
  }
}

export default connect(mapSateToProps, {hideFilterNav})(HomeTutorListView)