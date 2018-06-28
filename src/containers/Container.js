import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

class Container extends Component {
    render() {
        const { className = '', style = {}, isAuthenticated = true, isTutor, authRestrict = true, tutorRestrict = false, verifiedRestrict = true, history, isVerified } = this.props
        if (authRestrict && !isAuthenticated) {
            return <Redirect to='/login' />
        }

        if (!authRestrict && isAuthenticated) {
            const { from } = this.props.location.state || { from: isTutor ? '/dashboard' : '/bookings'}
            return <Redirect to={from} />
        }

        if (tutorRestrict && !isTutor ) {
            history.goBack()
        }

        if (verifiedRestrict && !isVerified ) {
            history.goBack()
        }

        return (
            <div className={className} style={style}>
                {this.props.children}
            </div>
        )
    }
}

Container.proptypes = {
    isAuthenticated: PropTypes.bool,
    isTutor: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    authRestrict: PropTypes.bool,
    tutorRestrict: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    const { 
        account: { isAuthenticated, user: { isTutor = false, verified = false } },
    } = state

    return {
        isAuthenticated,
        isTutor,
        isVerified: verified
    }
}
  
export default withRouter(connect(mapStateToProps)(Container))