import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { Link } from "react-router-dom"
import SearchTextForm from '../components/SearchTextForm'
import evaLogo from '../styles/images/logo.svg'
import NavbarItem from '../components/NavbarItem'
import ThumbnailAvatar from '../components/ThumbnailAvatar'
import UserDropDown from './UserDropDown'
import { showUserMenu, setActiveLocale, loadStudentsForUser, logout , showStudentBookingListModal, loadBookingsForStudent} from '../actions'
import backpack from '../styles/images/backpack.svg'
import cog from '../styles/images/cog.svg'
import log from '../styles/images/logout.svg'
import { isEmpty, values } from 'lodash'

class MainNavBar extends Component {
  tutorActions = () => {
    const { history, isTutor, notificationCount, currentLanguage, translate, setActiveLocale, logout } = this.props
    return [
      { 
        label: translate('navbar.links.dashboard'),
        notificationCount: notificationCount, 
        onClick: () => { history.push('/dashboard') }
      },
      {
        label: translate('navbar.links.find'),
        onClick: () => { history.push('/survey/student') }
      },
      {
        label: translate('navbar.links.language'),
        onClick: () => { setActiveLocale( currentLanguage === 'en' ? 'cn' : 'en') }
      },
      {
        label: translate('navbar.links.profile'),
        imageSrc: cog,
        imageStyle: { width: '18px', height: '18px' },
        onClick: () => { history.push('/account/tutor') }
      },
      {
        label: translate('navbar.links.logout'),
        imageSrc: log,
        imageStyle: { width: '18px', height: '18px' },
        onClick: () => { 
          logout()
        },
        style: {
          width: '100%',
          borderColor: 'white'
        }
      }
    ]
  }

  userActions = () => {
    const { history, isTutor, notificationCount, currentLanguage, translate, setActiveLocale, logout, user: {id} } = this.props
    return [
      { 
        label: translate('navbar.links.bookings'),
        notificationCount: notificationCount, 
        onClick: () => { 
          history.push(`/bookings/${id}`)
         }
      },
      {
        label: translate('navbar.links.find'),
        onClick: () => { history.push('/survey/student') }
      },
      {
        label: translate('navbar.links.language'),
        onClick: () => { setActiveLocale( currentLanguage === 'en' ? 'cn' : 'en') }
      },
      {
        label: translate('navbar.links.profile'),
        imageSrc: cog,
        imageStyle: { width: '18px', height: '18px' },
        onClick: () => { history.push('/account/user') }
      },
      {
        label: translate('navbar.links.logout'),
        imageSrc: log,
        imageStyle: { width: '18px', height: '18px' },
        onClick: () => {
          logout()
         },
        style: {
          width: '100%',
          borderColor: 'white'
        }
      }
    ]
  }

  handleShowMenu = () => {
    const { showUserMenu, history, isTutor, notificationCount, currentLanguage, translate, setActiveLocale, showStudentBookingListModal, loadBookingsForStudent} = this.props
    const students = values(this.props.students).map((student) => { return {
      id: student.id, 
      fullName: student.fullName, 
      expand: () => {
        loadBookingsForStudent(student.id)
        history.push(`/bookings/${student.bookingCount}/${student.id}`)
      }, 
      avatarUrl: backpack, 
      notificationCount: 0}})
      
    const tutorActions = this.tutorActions()
    const userActions = this.userActions()
    const actions = isTutor ? tutorActions : userActions
    showUserMenu(actions, students)
  }

  componentWillReceiveProps = (newProps) => {
    const { user: { id }, students, loadStudentsForUser, isAuthenticated } = this.props
    if (isAuthenticated && values(students).length !== values(this.props.students).length) {
      loadStudentsForUser(id)
    }
  }

  componentDidMount() {
    const { user: { id, isTutor }, students, loadStudentsForUser, isAuthenticated } = this.props
    if (isAuthenticated) {
      loadStudentsForUser(id)
    }
  }
  
  render() {
    const { translate, avatarUrl, tutorAccountId, isAuthenticated, currentLanguage, isTutor, notificationCount, isVerified  } = this.props
    const rightNavBarItem = isAuthenticated ? ( isVerified ? <ThumbnailAvatar imageSrc={avatarUrl} notificationsCount={notificationCount} showNotificationCount={true} width={40} onClick={this.handleShowMenu} /> : null ) : <NavbarItem translate={translate}/>
    return (
      <nav className={`navbar navbar-expand-lg navbar-light bg-light ${currentLanguage}`}>
        <div style={{position: 'relative'}} className="container">
          <Link className='navbar-brand' to="/">
            <img src={evaLogo} alt="Logo"/>
          </Link>
          {rightNavBarItem}
          <UserDropDown />
        </div>
      </nav>
    )
  }
}

MainNavBar.propTypes = {
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
  const { account: { user, 
        user: { avatarUrl, 
          tutorAccountId, 
          isTutor, 
          unseenBookingCount = 0, 
          unseenReviewCount = 0,
          verified = false 
        }, 
        isAuthenticated, 
      },
    entities: { students }
  } = state

  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    notificationCount: unseenBookingCount + unseenReviewCount,
    user,
    isTutor,
    avatarUrl,
    tutorAccountId,
    isAuthenticated,
    students,
    isVerified: verified
  }
}

export default withRouter(connect(mapStateToProps, {showUserMenu, setActiveLocale, loadStudentsForUser, logout, showStudentBookingListModal, loadBookingsForStudent})(MainNavBar))