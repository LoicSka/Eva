import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import GetStarted from './GetStarted'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/get-started" component={GetStarted} />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root;