import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { signUpUser } from '../actions'
import SignUpForm from './SignUpForm'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { isEmpty } from 'lodash'

class SignUpPage extends Component {
    render() {
        const { translate, currentLanguage, errors, authenticating, signUpUser, isAuthenticated, success } = this.props
        const headingText = currentLanguage === 'cn' ? <h3 className='my-3'>{translate('joinEva')}</h3> : <h3 className='my-3'>Join Eva<span className='cn-bd'>妈妈</span> today</h3>
        // redirect when authenticated
        const { from } = this.props.location.state || { from: '/setup/confirm' }
        if (isAuthenticated || success) {
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
                                <SignUpForm serverErrors={errors} translate={translate} authenticating={authenticating} submitUserForm={signUpUser} currentLanguage={currentLanguage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SignUpPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const { account: {isAuthenticated, authenticating, user }, errors } = state
  return {
    isAuthenticated,
    authenticating,
    errors,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    success: !isEmpty(user)
  }
}

export default withRouter(connect(mapStateToProps, {signUpUser})(SignUpPage))