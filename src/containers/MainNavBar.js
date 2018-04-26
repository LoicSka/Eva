import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { Link } from "react-router-dom"
import SearchTextForm from '../components/SearchTextForm'
import evaLogo from '../styles/images/evasmomlogo.svg'
import NavbarItem from '../components/NavbarItem'
import NavbarItemLoggedIn from '../components/NavbaritemLoggedIn'

class MainNavBar extends Component {
  render() {
    const { translate, avatarUrl, tutorAccountId, isAuthenticated  } = this.props
    const rightNavBarItem = isAuthenticated ? <NavbarItemLoggedIn imageSrc={avatarUrl} notificationsCount={29} /> : <NavbarItem/>
    return(
      <nav className="main-nav navbar-light bg-light">
        <div className='container'>
          <div className='row no-gutters justify-content-center'>
            <div className="bd-ctn col-md-2">
              <Link className='nav-icon' to="/">
                <img src={evaLogo} alt="Logo" />
              </Link>
            </div>
            <div className="reverse-md col-md-9">
              <SearchTextForm translate={translate} />
              {rightNavBarItem}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

MainNavBar.propTypes = {
  translate: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { account: { user: { avatarUrl, tutorAccountId }, isAuthenticated} } = state
  return {
    translate: getTranslate(state.locale),
    avatarUrl,
    tutorAccountId,
    isAuthenticated
  }
}

export default connect(mapStateToProps)(MainNavBar)