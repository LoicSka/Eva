import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { requestPasswordReset } from '../actions'
import EmailForm from './EmailForm'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Container from './Container';

class PasswordResetPage extends Component {
    render() {
        const { translate, currentLanguage, errors, requestPasswordReset } = this.props
        const headingText = <h3 className='my-3'>{translate('resetYourPassword')}</h3>
        return (
            <Container authRestrict={false} verifiedRestrict={false} className={`container signup-page my-4 ${currentLanguage}`}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-5">
                        <div className="card">
                            <div className="card-body">
                                {headingText}
                                <EmailForm serverErrors={errors} translate={translate} submitForm={requestPasswordReset} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

PasswordResetPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string,
  errors: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  const { errors } = state
  return {
    errors,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, {requestPasswordReset})(PasswordResetPage))