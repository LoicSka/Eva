import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import GetStarted from './GetStarted'
import SignUpPage from './SignUpPage'
import LoginPage from './LoginPage'
import ConfirmEmailPage from './ConfirmEmailPage'
import SelectAccountTypePage from './SelectAccountTypePage'
import EmailVerificationPage from './EmailVerificationPage'
import SurveyPage from './SurveyPage'
import MatchPage from './MatchPage'
import TutorAccountPage from './TutorAccountPage'
import SetUpTutorAccountPage from './SetUpTutorAccountPage'
import AccountPage from './AccountPage'
import SecondaryLayoutContainer from './SecondaryLayoutContainer'
import SetupLayoutContainer from './SetupLayoutContainer'
import PrimaryLayoutContainer from './PrimaryLayoutContainer'
import SetupCoursesPage from './SetupCoursesPage'
import HomeTutorListView from './HomeTutorListView'
import TutorDashboardPage from './TutorDashboardPage'
import StudentBookingsPage from './StudentBookingsPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
    <SecondaryLayoutContainer exact path="/get-started" component={GetStarted} />
      <SecondaryLayoutContainer exact path="/signup" component={SignUpPage} />
      <SecondaryLayoutContainer exact path="/login" component={LoginPage} />
      <SetupLayoutContainer exact path="/setup/confirm" component={ConfirmEmailPage} />
      <SetupLayoutContainer path="/users/:id/verify/:token" component={EmailVerificationPage} />
      <SetupLayoutContainer path="/setup/type" component={SelectAccountTypePage} />
      <SetupLayoutContainer path="/survey/:surveyType" component={SurveyPage} />
      <SetupLayoutContainer path="/match/:studentId" component={MatchPage} />
      <SetupLayoutContainer exact path="/bookings/:bookingCount/:studentId" component={StudentBookingsPage} />
      <SetupLayoutContainer exact path="/bookings/:bookingCount/" component={StudentBookingsPage} />
      <SetupLayoutContainer path="/tutor/:tutorAccountId" component={TutorAccountPage} />
      <SecondaryLayoutContainer exact path="/setup/tutor" component={SetUpTutorAccountPage} />
      <PrimaryLayoutContainer exact path="/account/:page" component={AccountPage} />
      <SecondaryLayoutContainer exact path="/setup-courses/" component={SetupCoursesPage} />
      <SecondaryLayoutContainer exact path="/setup-courses/:courseId" component={SetupCoursesPage} />
      <PrimaryLayoutContainer exact path="/dashboard" component={TutorDashboardPage} />
      <SecondaryLayoutContainer exact path="/" component={GetStarted} />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root;