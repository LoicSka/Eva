/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadUsers, loginUser } from '../actions'

class GetStarted extends Component {
  // static propTypes = {
  //   loadUsers: PropTypes.func.isRequired,
  //   users: PropTypes.arrayOf(PropTypes.object)
  // }

  componentDidMount() {
    
  }

  render() {
    return (
        <div className="panel-ctn justify-content-center row align-items-center">
          <div className="col-11 col-md-6">
            <h1>Join Hundreds of  </h1>
          </div>
          <div className="panel col-11 col-md-5">
            <h2 className="panel-title"> Sign up and get started now! </h2>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { users }
  } = state

  return {
    users
  }
}

export default withRouter(connect(mapStateToProps, {
  loadUsers,
  loginUser
})(GetStarted))