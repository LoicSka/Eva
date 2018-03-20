import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import TutorAccountForm from './TutorAccountForm'

class SetUpTutorAccountPage extends Component {
  render() {
    const { translate, currentLanguage, isAuthenticated } = this.props
    return(
      <div className="container" style={{ 'padding': 0 }}>
        <div className={`row panel-ctn py-3 justify-content-center align-items-center ${currentLanguage}`}>
          <div className="panel col-11 col-md-9">
            <TutorAccountForm translate={translate}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isAuthenticated } = state.auth
  const { errors } = state
  return {
    isAuthenticated,
    errors,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps)(SetUpTutorAccountPage))