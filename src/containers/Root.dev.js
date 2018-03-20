import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import GetStarted from './GetStarted'
import SelectAccountType from './SelectAccountType'
import SetUpTutorAccountPage from './SetUpTutorAccountPage'
import SecondaryLayoutContainer from './SecondaryLayoutContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <SecondaryLayoutContainer exact path="/get-started" component={GetStarted} />
      <SecondaryLayoutContainer exact path="/set-up" component={SelectAccountType} />
      <SecondaryLayoutContainer exact path="/set-up-tutor" component={SetUpTutorAccountPage} />
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root;