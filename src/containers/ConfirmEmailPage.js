import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sendWelcomeEmail } from '../actions'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { isEmpty } from 'lodash'

import mailIcon from '../styles/images/mail.svg'

class ConfirmEmailPage extends Component {
    handleSendWelcomeEmail = () => {
        const { sendWelcomeEmail, user: { id } } = this.props
        sendWelcomeEmail(id)
    }

    render() {
        const { currentLanguage, translate, isAuthenticated, isAuthorized, user: { verified = false } } = this.props
        const { from } = this.props.location.state || { from: "/setup/type" }
        if (verified === true && isAuthenticated === true) {
            return <Redirect to={from} />
        } else if (!isAuthorized) {
            this.props.history.push('/signup')
        }

        return(
            <div className='confirm-email-page'>
                <div className={`container my-4 ${currentLanguage}`}>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-11 col-md-5">
                            <div className="card bordered text-center">
                                <div className="card-body py-3">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <img className="my-3" style={{width: '25%'}} src={mailIcon} alt="mail-icon"/>
                                        <h3 className="my-3 text-center" >{translate('emailConfirm.title')}</h3>
                                        <p>{translate('emailConfirm.subTitle')}</p>
                                    </div>
                                </div>
                                <div className="card-footer text-muted">
                                    <button onClick={this.handleSendWelcomeEmail} style={{padding: 0}} className="btn btn-link">{translate('emailConfirm.buttonTitle')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ConfirmEmailPage.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
    const { account: { isAuthenticated = false, user = '' }, entities: { users } } = state
    return {
        isAuthenticated,
        isAuthorized: !isEmpty(user),
        user: users[user] || {},
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default withRouter(connect(mapStateToProps, {sendWelcomeEmail})(ConfirmEmailPage))
