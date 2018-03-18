/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { signUpUser } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import SignUpForm from './SignUpForm'

class GetStarted extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/set-up" } }
    const { translate, currentLanguage, signUpUser, isAuthenticated, errors } = this.props
    console.log('erros', errors)
    if (isAuthenticated) {
      return <Redirect to={from} />
    }
    return (
      <div className="container" style={{'padding': 0}}>
        <div className={`row panel-ctn py-3 justify-content-center align-items-center ${currentLanguage}`}>
          <div className="col-11 col-md-6 my-2 text-ctn ">
            <h1>{translate('getStarted.introTitle')}</h1>
            <p>{translate('getStarted.introSubtitle')}</p>
          </div>
          <div className="panel col-11 col-md-5">
            <h2 className="panel-title">{translate('getStarted.header')}</h2>
            <SignUpForm serverErrors={errors} submitUserForm={signUpUser} translate={translate} />
          </div>
        </div>
      </div>
    );
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

export default withRouter(connect(mapStateToProps, {
  signUpUser
})(GetStarted))