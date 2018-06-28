import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { verifyEmail } from '../actions'
import { withRouter, Redirect, Link } from 'react-router-dom'

class EmailVerificationPage extends Component {
    componentDidMount = () => {
        const { verifyEmail, match: { params: { token, id }} } = this.props
        verifyEmail(id, token)
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/signup" } }
        const { verified = false, isAuthenticated = false } = this.props
        if (verified && isAuthenticated) {
            return <Redirect to="/setup/type"/>
        } else if (verified) {
            return <Redirect to="/login" />
        } else {
            return (
                <div>...</div>
            )
        }
    }
}

EmailVerificationPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    verifyEmail: PropTypes.func,
    verified: PropTypes.bool
  }
  
const mapStateToProps = (state, ownProps) => {
    const { account: {isAuthenticated, user: { verified = false }} } = state
    return {
        isAuthenticated,
        verified
    }
}
  
  export default withRouter(connect(mapStateToProps, {verifyEmail})(EmailVerificationPage))

