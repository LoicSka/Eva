import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { loadRegions, updateUserAccount, resetAccount } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import TutorAccountForm from './TutorAccountForm'
import values from 'lodash/values'
import ThumbnailAvatar from '../components/ThumbnailAvatar'

class SetUpTutorAccountPage extends Component {
  componentDidMount = () => {
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
      <div className="container my-4">
        <div className={`row ${currentLanguage}`}>
          <div className="col-12 col-md-3 my-4 ">
          <div className="d-flex flex-row mb-2">
              <div>
                <ThumbnailAvatar imageSrc={user.avatarUrl} width={45} height={45}/>
              </div>
              <div className="ml-2 px-0">
                <div className="user-details py-1">
                  <h5 className='m-0'>{user.fullName}</h5>
                  <p style={{fontSize: '.9rem'}} className='m-0'>{translate('account.edit')}</p>
                </div>
              </div>
            </div>
            <div className="card bordered">
              <div className="card-body">
                <nav className="nav flex-column">
                  <a className="nav-link active" href="#">Profile</a>
                  <a className="nav-link disabled" href="#">Passwords</a>
                  <a className="nav-link disabled" href="#">Link</a>
                  <a className="nav-link disabled" href="#">Disabled</a>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 my-4 pl-4">
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