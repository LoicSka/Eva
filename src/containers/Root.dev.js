import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import GetStarted from './GetStarted'
import SelectAccountType from './SelectAccountType'
import SetUpTutorAccountPage from './SetUpTutorAccountPage'
import SecondaryLayoutContainer from './SecondaryLayoutContainer'
import PrimaryLayoutContainer from './PrimaryLayoutContainer'
import SetupCoursesPage from './SetupCoursesPage'
import HomeTutorListView from './HomeTutorListView'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <SecondaryLayoutContainer exact path="/get-started" component={GetStarted} />
      <SecondaryLayoutContainer exact path="/setup" component={SelectAccountType} />
      <SecondaryLayoutContainer exact path="/setup-tutor" component={SetUpTutorAccountPage} />
      <SecondaryLayoutContainer exact path="/setup-courses/" component={SetupCoursesPage} />
      <SecondaryLayoutContainer exact path="/setup-courses/:courseId" component={SetupCoursesPage} />
      <PrimaryLayoutContainer exact path="/" component={HomeTutorListView} />
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root;