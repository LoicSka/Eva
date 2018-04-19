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
    const { from } = this.props.location.state || { from: { pathname: "/setup" } }
    const { translate, currentLanguage, signUpUser, isAuthenticated, errors, authenticating } = this.props
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
            <SignUpForm serverErrors={errors} authenticating={authenticating} submitUserForm={signUpUser} translate={translate} />
          </div>
        </div>
      </div>
    )
  }
}

GetStarted.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const { account: {isAuthenticated, authenticating}, errors } = state
  return {
    isAuthenticated,
    authenticating,
    errors,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, {
  signUpUser
})(GetStarted))