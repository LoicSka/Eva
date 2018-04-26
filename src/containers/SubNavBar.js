import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { Link } from "react-router-dom"
import SubNavBarItemLeft from '../components/SubNavBarItemLeft'
import SubNavBarItemRight from '../components/SubNavBarItemRight'
import { toggleFilterNav } from '../actions'

class SubNavBar extends Component {
  render() {
    const { toggleFilterNav } = this.props
    return (
      <nav className='sub-navbar'>
        <div className='container'>
          <div className='row no-gutters justify-content-center' style={{ padding: '0 2.5rem' }}>
            <div className='col-md-6' style={{ padding: '0 .2rem' }}>
              <SubNavBarItemLeft toggleFilterNav={toggleFilterNav} />
            </div>
            <div className='col-md-5' style={{ padding: '0 .2rem' }} >
              <SubNavBarItemRight />
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

SubNavBar.propTypes = {
  translate: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
  }
}

export default connect(mapStateToProps, {toggleFilterNav})(SubNavBar)