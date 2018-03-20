import { normalize, schema } from 'normalizr'
import { camelizeKeys, decamelizeKeys, camelize } from 'humps'
import forEach from 'lodash/forEach'
import axios from 'axios'
import qs from 'qs'

const queryString = require('query-string')

const API_ROOT = 'http://localhost:3000/api/v1/'
const getNextPage = response => {
  const next = response.headers.get('Next')
  if (!next) {
    return null
  }
  return next
}

const callApi = (endpoint, schema, data = null, method = 'GET') => {
  var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (localStorage.jwtToken) {
    headers.append('Authorization', `Bearer ${localStorage.jwtToken}`)
  }
  switch (method) {
    case 'POST':
    case 'PUT':
      var body = JSON.stringify(data)
      return fetch(fullUrl, {
        method,
        body,
        headers
      }).then(response => response.json().then(json => {
        if (!response.ok) {
          return Promise.reject({ message: 'server.general'})
        }
        if (json.status !== '22000') {
          const { validations } = json
          forEach(validations, (value, key) => {
            validations[key] = `errors.server.${camelize(value[0])}`
          })
          return Promise.reject({ message: 'server.general', validations: camelizeKeys(validations)})
        }
        const camelizedJson = camelizeKeys(json.result)
        return Object.assign({},
          normalize(camelizedJson, schema)
        )
      }))
    default:
      if (data) {
        let query = queryString.stringify(decamelizeKeys(data))
        fullUrl = `${fullUrl}/?${query}`
      }
      return fetch(fullUrl, {
        method,
        headers
      }).then(response =>
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject('server')
          }

          const camelizedJson = camelizeKeys(json.result)
          const nextPage = getNextPage(response)

          return Object.assign({},
            normalize(camelizedJson, schema),
            { nextPage }
          )
        })
      )
  }
}

const uploadFile = (endpoint, data, method = 'PUT', onUploadProgress) => {

  axios.defaults.headers.put['Content-Type'] = 'application/json';
  if (localStorage.jwtToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwtToken}`
  }

  var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const formData = new FormData()
  forEach(data, (value, key) => {
    formData.append(key, value)
  })

  var options = {
    method: method,
    url: fullUrl,
    data: formData,
    config: {
      onUploadProgress
    },
    headers: {
      'Authorization': `Bearer ${localStorage.jwtToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
    json: true
  };

  axios(options).then( response => {
    console.log('RESPONSE',response)
  }).catch( error => {
    console.log('ERROR', error)
  })
}

const tutorAccountSchema = new schema.Entity('tutorAccounts', {}, {
  idAttribute: tutorAccount => tutorAccount.id
})

const authSchema = new schema.Entity('authToken',{},{
  idAttribute: auth => auth.jwt
})

const userSchema = new schema.Entity('users', {
  tutorAccount: tutorAccountSchema
}, {
    idAttribute: user => user.id
})

// Schemas for API responses.
export const Schemas = {
  USER: userSchema,
  AUTH: authSchema,
  USER_ARRAY: [userSchema],
  TUTOR_ACCOUNT: tutorAccountSchema,
  TUTOR_ACCOUNT_ARRAY: [tutorAccountSchema]
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  
  let { endpoint } = callAPI
  const { schema, types, method, data, onUploadProgress = null } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length < 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  
  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType, progressType = null ] = types
  next(actionWith({ type: requestType }))
  if (progressType) {
    return uploadFile(endpoint, data, method, onUploadProgress)

  } else {
    return callApi(endpoint, schema, data, method).then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        message: {
          type: 'error',
          title: 'errors.oops',
          content: `errors.${camelize(error.message)}` || 'errors.badResponse'
        },
        errors: error.validations
      }))
    )
  }
}

