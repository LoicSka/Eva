import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import GetStarted from './GetStarted'
import SecondaryLayoutContainer from './SecondaryLayoutContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <SecondaryLayoutContainer exact path="/get-started" component={GetStarted} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root;