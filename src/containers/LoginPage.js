import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loginUser } from '../actions'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

class LoginPage extends Component {
    render() {
        const { translate, currentLanguage, errors, authenticating, loginUser, isAuthenticated, isTutor } = this.props
        const headingText = currentLanguage === 'cn' ? <h3 className='my-3'>{translate('LoginToJoinEva')}</h3> : <h3 className='my-3'>Login to join Eva<span className='cn-bd'>妈妈</span></h3>
        // redirect when authenticated
        const { from } = this.props.location.state || { from: isTutor ? '/dashboard' : '/bookings' }
        if (isAuthenticated) {
            return <Redirect to={from} />
        }
        return (
            <div className={`container signup-page my-4 ${currentLanguage}`}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-5">
                        <div className="card">
                            <div className="card-body">
                                {headingText}
                                <p className='sub-heading'>Eva<span>妈妈</span>{translate('EvaIntro')}</p>
                                <LoginForm serverErrors={errors} translate={translate} authenticating={authenticating} submitUserForm={loginUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string,
  isTutor: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const { account: {isAuthenticated, authenticating, user, user: { isTutor = false }}, errors } = state
  return {
    isAuthenticated,
    authenticating,
    errors,
    isTutor,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, {loginUser})(LoginPage))