import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
// import classnames from 'classnames'
import { Link } from "react-router-dom";
import SearchTextForm from '../components/SearchTextForm'
import evaLogo from '../styles/images/evasmomlogo.svg'

class MainNavBar extends Component {
  render() {
    const { translate } = this.props
    return(
      <nav className="navbar navbar-expand flex-md-row navbar-light bg-light">
        <Link to="/" className="navbar-brand ml-sm-4">
          <img src={evaLogo} alt="Logo" />
        </Link>
        <SearchTextForm translate={translate} />
        <div className=" navbar-collapse justify-content-end">
          <div className="navbar-nav">
            <Link to="/get-started" className="nav-item nav-link mr-sm-3">Help</Link>
            <Link to="/get-started" className="nav-item nav-link mr-sm-3">Login</Link>
            <Link to="/get-started" className="btn btn-primary mr-sm-4">Sign up</Link>
          </div>
        </div>
      </nav>
    )
  }
}

MainNavBar.propTypes = {
  translate: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getTranslate(state.locale),
  }
}

export default connect(mapStateToProps)(MainNavBar)