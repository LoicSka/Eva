import { normalize, schema } from 'normalizr'
import { camelizeKeys, decamelizeKeys, camelize } from 'humps'
import forEach from 'lodash/forEach'
import axios from 'axios'
import * as qs from 'query-string'

const API_ROOT = `${process.env.REACT_APP_API_URL}/api/v${process.env.REACT_APP_API_VERSION}/`
const getNextPage = response => {
  const next = response.headers.get('Next')
  if (!next) {
    return null
  }
  return next
}

const callApi = (endpoint, schema, data = null, method = 'GET') => {
  var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  var headers = new Headers()
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
        headers,
      }).then(response => response.json().then(json => {
        console.log('RESPONSE', json);
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
        return Object.assign(
          {},
          normalize(camelizedJson, schema)
        )
      }))
    case 'DELETE':
      return fetch(fullUrl, {
        method,
        body,
        headers,
      }).then(response => response.json().then(json => {
        if (!response.ok) {
          return Promise.reject({ message: 'server.general' })
        }
        const camelizedJson = camelizeKeys(data)
        return Object.assign(
          {},
          normalize(camelizedJson, schema)
        )
      }))
    default:
      if (data) {
        let query = qs.stringify(decamelizeKeys(data))
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
          const { result = null } = json
          const camelizedJson = camelizeKeys(result ? result : {})
          // const nextPage = getNextPage(response)
          console.log('RESPONSE', response)
          return Object.assign({},
            normalize(camelizedJson, schema),
            // { nextPage }
          )
        })
      )
  }
}

const uploadFile = (endpoint, data, method = 'PUT', onUploadProgress, schema) => {
  var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const formData = new FormData()
  forEach(data, (value, key) => {
    formData.append(key, value)
  })
  
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (localStorage.jwtToken) {
    headers.append('Authorization', `Bearer ${localStorage.jwtToken}`)
  }

  var config = {
    method: method,
    url: fullUrl,
    data: formData,
    onUploadProgress,
    headers,
    json: true
  }

  return axios(config).then( response => {
    const { data } = response
    // console.log('DATA', data )
    if (data.status !== '22000') {
      const { validations } = data
      forEach(validations, (value, key) => {
        validations[key] = `errors.server.${camelize(value[0])}`
      })
      return Promise.reject({ message: 'server.general', validations: camelizeKeys(validations) })
    }
    const camelizedJson = camelizeKeys(data.result)
    return Object.assign({},
      normalize(camelizedJson, schema)
    )
  })
}

const regionSchema = new schema.Entity('regions', {}, {
  idAttribute: region => region.id
})

const accountSchema = new schema.Entity('authToken',{},{
  idAttribute: auth => auth.jwt
})

const subjectSchema = new schema.Entity('subjects', {}, {
  idAttribute: subject => subject.id
})

const tagSchema = new schema.Entity('tags', {}, {
  idAttribute: tag => tag.id
})

const reviewSchema = new schema.Entity('reviews', {}, {
  idAttribute: review => review.id
})

const bookingSchema = new schema.Entity('bookings', {}, {
  idAttribute: booking => booking.id
})

const courseSchema = new schema.Entity('courses', {
  tags: [tagSchema],
  subject: subjectSchema
}, {
  idAttribute: course => course.id
})

const tutorAccountSchema = new schema.Entity('tutorAccounts', {
  region: regionSchema,
  bookings: [bookingSchema]
}, {
  idAttribute: tutorAccount => tutorAccount.id
})

const ratingSchema = new schema.Entity('ratings', {
  tutorAccount: tutorAccountSchema,
  review: reviewSchema
}, {
  idAttribute: rating => rating.id
})

const studentMatchSchema = new schema.Entity('studentMatches', { 
  tutorAccount: tutorAccountSchema
}, {
  idAttribute: match => match.id
})

const studentSchema = new schema.Entity('students', {
  matches: [studentMatchSchema]
}, {
  idAttribute: student => student.id
})

const tutorMatchSchema = new schema.Entity('tutorMatches', { 
  student: studentSchema
}, {
  idAttribute: match => match.id
})

const userSchema = new schema.Entity('users', {
  tutorAccount: tutorAccountSchema
}, {
  idAttribute: user => user.id
})

// Schemas for API responses.
export const Schemas = {
  USER: userSchema,
  ACCOUNT: accountSchema,
  USER_ARRAY: [userSchema],
  TUTOR_ACCOUNT: tutorAccountSchema,
  TUTOR_ACCOUNT_ARRAY: [tutorAccountSchema],
  REGION: regionSchema,
  REGION_ARRAY: [regionSchema],
  TAG: tagSchema,
  TAG_ARRAY: [tagSchema],
  SUBJECT: subjectSchema,
  SUBJECT_ARRAY: [subjectSchema],
  COURSE: courseSchema,
  COURSE_ARRAY: [courseSchema],
  STUDENT: studentSchema,
  STUDENT_ARRAY: [studentSchema],
  REVIEW: reviewSchema,
  REVIEW_ARRAY: [reviewSchema],
  RATING: ratingSchema,
  RATING_ARRAY: [ratingSchema],
  BOOKING: bookingSchema,
  BOOKING_ARRAY: [bookingSchema]
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
  const { schema = null, types, method, data, onUploadProgress = null } = callAPI

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

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))
  if (onUploadProgress) {
    return uploadFile(endpoint, data, method, onUploadProgress, schema).then(
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
  } else {
    return callApi(endpoint, schema, data, method).then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        errors: error.validations
      }))
    )
  }
}

