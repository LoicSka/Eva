import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { updatePassword } from '../actions'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import ResetPasswordForm from './ResetPasswordForm';
import Container from './Container'

class LoginPage extends Component {
    render() {
        const { translate, currentLanguage, errors, updatePassword, match: { params: { userId }} } = this.props
        const headingText = <h3 className='my-3'>{translate('resetYourPassword')}</h3>
        return (
            <Container authRestrict={false} verifiedRestrict={false} className={`container signup-page my-4 ${currentLanguage}`}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-5">
                        <div className="card">
                            <div className="card-body">
                                {headingText}
                                <ResetPasswordForm serverErrors={errors} translate={translate} userId={userId} submitForm={updatePassword} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

LoginPage.propTypes = {
  errors: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const { errors } = state
  return {
    errors,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, {updatePassword})(LoginPage))