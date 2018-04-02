import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import SecondaryLayoutContainer from './SecondaryLayoutContainer'
import GetStarted from './GetStarted'
import SelectAccountType from './SelectAccountType'
import SetUpTutorAccountPage from './SetUpTutorAccountPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <SecondaryLayoutContainer exact path="/get-started" component={GetStarted} />
      <SecondaryLayoutContainer exact path="/setup" component={SelectAccountType} />
      <SecondaryLayoutContainer exact path="/setup-tutor" component={SetUpTutorAccountPage} />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root;