import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { loadRegions, updateUserAccount, resetAccount } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import TutorAccountForm from './TutorAccountForm'
import UserAccountForm from './UserAccountForm'
import ResetPasswordForm from './ResetPasswordForm'
import AccountCalendar from './AccountCalendar'
import values from 'lodash/values'
import ThumbnailAvatar from '../components/ThumbnailAvatar'
import classnames from 'classnames'

class AccountPage extends Component {
    currentPage = () => {
        const { match: { params: { page } }, translate, currentLanguage, isUpdating, hasUpdated, user, errors, updateUserAccount, resetAccount, history } = this.props
        const regions = values(this.props.regions).map((region) => {
            return {
                name: currentLanguage === 'en' ? `${region.cityName[0]}, ${region.countryName[0]}`: `${region.cityName[1]}, ${region.countryName[1]}`,
                value: region.id,
                symbol: region.cityName[1]
            }
        })
        switch(page) {
            case 'tutor':
            return <TutorAccountForm resetAccount={resetAccount} history={history} serverErrors={errors} hasUpdated={hasUpdated} isUpdating={isUpdating} regions={regions} currentLanguage={currentLanguage} user={user} updateUserAccount={updateUserAccount} translate={translate} />
            case 'passwords':
            return <ResetPasswordForm serverErrors={errors} currentLanguage={currentLanguage} userId={user.id} submitForm={updateUserAccount} translate={translate} />
            case 'calendar':
            return <AccountCalendar hasUpdated={hasUpdated} isUpdating={isUpdating} regions={regions} currentLanguage={currentLanguage} user={user} updateUserAccount={updateUserAccount} translate={translate} />
            default: 
            return <UserAccountForm resetAccount={resetAccount} history={history} serverErrors={errors} hasUpdated={hasUpdated} isUpdating={isUpdating} regions={regions} currentLanguage={currentLanguage} user={user} updateUserAccount={updateUserAccount} translate={translate}/>
        }
    }

    isCurentPage = (pageName) => {
        const { match: { params: { page } }} = this.props
        switch(pageName) {
            case 'tutor':
            case 'user':
            return page === 'tutor' || page === 'user' || ['passwords', 'tutor', 'user', 'calendar'].indexOf(page) === -1
            default: 
            return page === pageName
        }
    }

    componentDidMount = () => {
        const { loadRegions } = this.props
        loadRegions()
    }

    render() {
        const { match: { params: { page } }, translate, currentLanguage, isAuthenticated, isUpdating, hasUpdated, user, errors, updateUserAccount, resetAccount, history, isTutor = false } = this.props
        const { from } = this.props.location.state || { from: { pathname: "/" } }
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
                    <ul className="list-group list-group-flush">
                        <li className={classnames('list-group-item', {'nav-active': this.isCurentPage('tutor')})}>
                            <Link to={`/account/${isTutor ? 'tutor' : 'user'}`} className='sub-nav-link' >Profile</Link>
                        </li>
                        <li className={classnames('list-group-item', {'nav-active': this.isCurentPage('passwords')})}>
                            <Link to='/account/passwords' className='sub-nav-link'>Passwords</Link>
                        </li>
                        <li style={{display: isTutor ? 'block' : 'none'}} className="list-group-item">
                            <Link to={`/survey/${isTutor ? 'tutor' : 'user'}`} className="sub-nav-link">Take the survey</Link>
                        </li>
                        <li style={{display: isTutor ? 'block' : 'none'}} className={classnames('list-group-item', {'nav-active': this.isCurentPage('calendar')})}>
                            <Link to='/account/calendar' className='sub-nav-link' >My Calendar</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="account-form-ctn col-12 col-md-9 my-4 pl-md-4">
                {this.currentPage()}
            </div>
            </div>
        </div>
        )
    }
}

AccountPage.proptypes = {
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
    account: { isAuthenticated, isUpdating, hasUpdated, user, user: { isTutor } },
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
    isTutor: isTutor || ownProps.isTutor,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, { loadRegions, updateUserAccount, resetAccount })(AccountPage))