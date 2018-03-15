import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
// import classnames from 'classnames'
import SearchTextForm from '../components/SearchTextForm'
import evaLogo from '../styles/images/evasmomlogo.svg'

class MainNavBar extends Component {
  constructor(props) {
    super(props)
    
  }
  
  render() {
    const { translate } = this.props
    return(
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={evaLogo} />
        </a>
        <SearchTextForm translate={translate} />
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