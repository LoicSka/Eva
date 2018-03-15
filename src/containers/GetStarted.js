/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signUpUser } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import SignUpForm from './SignUpForm'

class GetStarted extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  render() {
    const { translate, currentLanguage, signUpUser } = this.props
    return (
      <div className="container" style={{'padding': 0}}>
        <div className={`row panel-ctn justify-content-center align-items-center ${currentLanguage}`}>
          <div className="col-11 col-md-6">
            <h1>Join Hundreds of  </h1>
          </div>
          <div className="panel col-11 col-md-5">
            <h2 className="panel-title">{translate('getStarted.header')}</h2>
            <SignUpForm submitUserForm={signUpUser} translate={translate} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, {
  signUpUser
})(GetStarted))