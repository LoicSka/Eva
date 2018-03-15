import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import SecondaryLayoutContainer from './SecondaryLayoutContainer'
import GetStarted from './GetStarted'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <SecondaryLayoutContainer exact path="/get-started" component={GetStarted} />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root;