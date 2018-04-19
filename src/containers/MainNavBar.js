import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { Link } from "react-router-dom"
import SearchTextForm from '../components/SearchTextForm'
import evaLogo from '../styles/images/evasmomlogo.svg'
import NavbarItem from '../components/NavbarItem'

class MainNavBar extends Component {
  render() {
    const { translate } = this.props
    return(
      <nav className="navbar navbar-light bg-light">
        <div className='container'>
          <div className="bd-ctn">
            <Link className='nav-icon' to="/">
              <img src={evaLogo} alt="Logo" />
            </Link>
          </div>
          <div className="reverse-md">
            <SearchTextForm translate={translate} />
            <NavbarItem />
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
  return {
    translate: getTranslate(state.locale),
  }
}

export default connect(mapStateToProps)(MainNavBar)