import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HomeFilterView from './HomeFilterView'

class HomeTutorListView extends Component {
  render() {
    return (
      <div className="container" style={{ 'padding': 0 }}>
        <div className="row">
          <div className="col col-md-4" style={{ height: '200px' }}>
            <div className='home-filter-ctn'>
              <HomeFilterView />
            </div>
          </div>
          <div className="row col-md-8" style={{ height: '200px' }}>

          </div>
        </div>
      </div>
    )
  }
}

export default HomeTutorListView