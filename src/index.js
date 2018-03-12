import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { setCurrentUser } from'./actions'
import jwtDecode from 'jwt-decode'
import './styles/styles.css'

const store = configureStore()

if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)

