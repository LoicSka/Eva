import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { setCurrentUser } from'./actions'
import jwtDecode from 'jwt-decode'
import './styles/styles.css'
import { initialize } from 'react-localize-redux'
import { addTranslation, setActiveLanguage } from 'react-localize-redux'
import { camelizeKeys } from 'humps'

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Chinese', code: 'cn' }
];
const locales = require('./locales/global.json')
const store = configureStore()
// localization
store.dispatch(initialize(languages, { defaultLanguage: 'en' }))
store.dispatch(addTranslation(locales))

// authorization
if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(camelizeKeys(jwtDecode(localStorage.jwtToken))))
}

if (localStorage.locale) {
  store.dispatch(setActiveLanguage(localStorage.locale))
}

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)

