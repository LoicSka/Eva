import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { loadRegions, updateUserAccount, resetAccount } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import TutorAccountForm from './TutorAccountForm'
import values from 'lodash/values'

class SetUpTutorAccountPage extends Component {
  
  componentDidMount() {
    const { loadRegions } = this.props
    loadRegions()
  }

  render() {
    const { translate, currentLanguage, isAuthenticated, isUpdating, hasUpdated, user, errors, updateUserAccount, resetAccount, history } = this.props
    const regions = values(this.props.regions).map((region) => {
      return (
        {
          name: `${region.cityName}, ${region.countryName}`,
          value: region.id
        }
      )
    })
    const { from } = this.props.location.state || { from: { pathname: "/get-started" } }
    if (!isAuthenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="container" style={{ 'padding': 0 }}>
        <div className={`row panel-ctn py-3 justify-content-center align-items-center ${currentLanguage}`}>
          <div className="panel col-11 col-md-9">
            <TutorAccountForm resetAccount={resetAccount} history={history} serverErrors={errors} hasUpdated={hasUpdated} isUpdating={isUpdating} regions={regions} currentLanguage={currentLanguage} user={user} updateUserAccount={updateUserAccount} translate={translate}/>
          </div>
        </div>
      </div>
    )
  }
}

SetUpTutorAccountPage.proptypes = {
  isAuthenticated: PropTypes.bool,
  hasUpdated: PropTypes.bool,
  isUpdating: PropTypes.bool,
  errors: PropTypes.object,
  regions: PropTypes.object,
  user: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string,
  resetAccount: PropTypes.func,
  updateUserAccount: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { 
    account: { isAuthenticated, isUpdating, hasUpdated, user },
    errors,
    entities: { regions }
  } = state

  return {
    isAuthenticated,
    errors,
    user,
    isUpdating,
    hasUpdated,
    regions,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, { loadRegions, updateUserAccount, resetAccount })(SetUpTutorAccountPage))