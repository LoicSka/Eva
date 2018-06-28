import React, { Component } from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import TextareaGroup from '../components/TextareaGroup'
import SelectfieldGroup from '../components/SelectfieldGroup'
import validateTutorAccountInput from '../validations/tutorAccountValidations'
import PropTypes from 'prop-types'
import AvatarInputView from './AvatarInputView'
import { merge, lowerCase, omit, isEmpty, findLast, values, flattenDeep} from 'lodash'
import * as moment from 'moment'
import 'moment/locale/zh-cn'
import chinaDistricts from '../chinaCities'
const countries = require("country-list")()

class UserAccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      createdAt: '',
      errors: {},
      saving: false
    }
  }

  onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })
  getTranslation = value => value ? this.props.translate(value) : null
  setupLocale = () => {
    const { currentLanguage } = this.props
    currentLanguage === 'cn' ? moment.locale('zh-cn') : moment.locale('en')
  }

  isValid() {
    const { errors, isValid } = validateTutorAccountInput(this.state)
    if (!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  componentDidMount() {
    const { user } = this.props
    this.setState(user)
    this.setupLocale()
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { updateUserAccount, user} = this.props
    this.setState({ errors: {} })
    if (this.isValid()) {
      this.setState({ saving: true })
      updateUserAccount(omit(this.state, ['errors', 'createdAt', 'updatedAt', 'regionName']), user.id)
    }
  }

  componentWillReceiveProps() {
    this.setupLocale()
  }

  render() {
    const { translate, currentLanguage, isUpdating, hasUpdated, serverErrors, regions, resetAccount } = this.props
    const { firstName, lastName, email,  errors, saving } = this.state

    const combinedErrors = merge(errors, serverErrors)

    const createdAt = moment(this.state.createdAt).format('LL')
    if (hasUpdated && saving) {
      this.props.history.push({ pathname: '/survey/tutor', state: {} })
      resetAccount()
    }

    return (
      <div className="row">
        <div className="col-12">
            <div className="d-flex flex-row">
                <div>
                    <AvatarInputView />
                </div>
            </div>
            <div className="row">
                <div className="col-12 px-3 mt-2">
                <form onSubmit={this.onSubmit}>
                    <TextfieldGroup
                    error={this.getTranslation(combinedErrors.firstName)}
                    value={firstName}
                    onChange={this.onChange}
                    field='firstName'
                    type='text'
                    label={`${translate('userFields.firstName')} *`}
                    />
                    <TextfieldGroup
                    error={this.getTranslation(combinedErrors.lastName)}
                    value={lastName}
                    onChange={this.onChange}
                    field='lastName'
                    type='text'
                    label={`${translate('userFields.lastName')} *`}
                    />
                    <TextfieldGroup
                    error={this.getTranslation(combinedErrors.email)}
                    value={email}
                    placeholder='123@example.com'
                    onChange={this.onChange}
                    field='email'
                    type='email'
                    label={`${translate('userFields.email')} *`}
                    />
                    <button
                    type='submit'
                    className='btn btn-success btn-block mt-4'
                    disabled={isUpdating}>{isUpdating ? translate('userActions.saving') : translate('userActions.continue') }
                    </button>
                </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

UserAccountForm.propTypes = {
  user: PropTypes.object,
  translate: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  hasUpdated: PropTypes.bool,
  resetAccount: PropTypes.func,
  serverErrors: PropTypes.object,
  regions: PropTypes.array,
  updateUserAccount: PropTypes.func
}

export default UserAccountForm
