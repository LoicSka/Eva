/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadUsers, loginUser } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

class GetStarted extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
  }

  componentDidMount() {
    
  }

  render() {
    const { translate, currentLanguage } = this.props
    return (
      <div className={`panel-ctn justify-content-center row align-items-center ${currentLanguage}` }>
          <div className="col-11 col-md-6">
            <h1>Join Hundreds of  </h1>
          </div>
          <div className="panel col-11 col-md-5">
          <h2 className="panel-title">{translate('getStarted.header')}</h2>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { users }
  } = state

  return {
    users,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, {
  loadUsers,
  loginUser
})(GetStarted))