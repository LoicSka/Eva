import React, { Component } from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import TextareaGroup from '../components/TextareaGroup'
import SelectfieldGroup from '../components/SelectfieldGroup'
import validateTutorAccountInput from '../validations/tutorAccountValidations'
import PropTypes from 'prop-types'
import AvatarInputView from './AvatarInputView'
import omit from 'lodash/omit'
import merge from 'lodash/merge'
import * as moment from 'moment'
import 'moment/locale/zh-cn'
const countries = require("country-list")()

class TutorAccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      introduction: '',
      phoneNumber: '',
      weiboUrl: '',
      wechatId: '',
      countryOfOrigin: '',
      regionId: '',
      occupation: '',
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
    console.log(errors)
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

  componentWillReceiveProps() {
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
    const { saving } = this.state
    const { hasUpdated } = this.props
    if (hasUpdated && saving) {
      this.props.history.push({ pathname: '/', state: {} })
    }
  }

  render() {
    const { translate, currentLanguage, isUpdating, hasUpdated, serverErrors, regions, resetAccount } = this.props
    const { firstName, lastName, email, introduction, phoneNumber, weiboUrl, wechatId, regionId, countryOfOrigin, occupation, errors, saving } = this.state
    const combinedErrors = merge(errors, serverErrors)
    const countryNames = countries.getNames()
    const createdAt = moment(this.state.createdAt).format('LL')

    if (hasUpdated && saving) {
      this.props.history.push({ pathname: '/setup-courses', state: {} })
      resetAccount()
    }

    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-4 col-md-3">
                <AvatarInputView />
              </div>
              <div className="col-8 col-md-9 px-0">
                <div className="user-details py-1">
                  <h5>{`${firstName} ${lastName}`}</h5>
                  <p><strong>{`Member since ${createdAt}`}</strong></p>
                  <p>{email}</p>
                </div>
              </div>
            </div>
              <div className="row">
                <div className="col-12 px-3 mt-2">
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
                  <TextareaGroup
                    error={this.getTranslation(combinedErrors.introduction)}
                    value={introduction}
                    onChange={this.onChange}
                    field='introduction'
                    type='text'
                    subLabel={translate('userFields.subIntro')}
                    label={`${translate('userFields.intro')} *`}
                  />
                  <TextfieldGroup
                    error={this.getTranslation(combinedErrors.phoneNumber)}
                    value={phoneNumber}
                    onChange={this.onChange}
                    field='phoneNumber'
                    type='number'
                    label={`${translate('userFields.phoneNumber')} *`}
                  />
                </div>
              </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row sep-right">
              <div className="vertical-divider"></div>
              <div className="col-12 px-3 mt-md-5">
                <TextfieldGroup
                  error={this.getTranslation(combinedErrors.weibo)}
                  value={weiboUrl}
                  onChange={this.onChange}
                  field='weiboUrl'
                  type='text'
                  label={translate('userFields.weibo')}
                />
                <TextfieldGroup
                  error={this.getTranslation(combinedErrors.wechatId)}
                  value={wechatId}
                  onChange={this.onChange}
                  field='wechatId'
                  type='text'
                  label={translate('userFields.wechatId')}
                />
                <SelectfieldGroup
                  error={this.getTranslation(combinedErrors.region)}
                  value={regionId}
                  onChange={this.onChange}
                  field='regionId'
                  options={regions}
                  type='text'
                  label={translate('userFields.region')}
                />
                <SelectfieldGroup
                  error={this.getTranslation(combinedErrors.countryOfOrigin)}
                  value={countryOfOrigin}
                  onChange={this.onChange}
                  field='countryOfOrigin'
                  options={countryNames}
                  type='text'
                  label={translate('userFields.country')}
                />
                <SelectfieldGroup
                  error={this.getTranslation(combinedErrors.occupation)}
                  value={occupation}
                  onChange={this.onChange}
                  field='occupation'
                  options={['Full-time tutor', 'Part-time tutor']}
                  type='text'
                  label={translate('userFields.occupation')}
                />
                <button
                  type='submit'
                  className='btn btn-success btn-block'
                  disabled={isUpdating}>{isUpdating ? translate('userActions.saving') : translate('userActions.save') }
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

TutorAccountForm.propTypes = {
  user: PropTypes.object,
  translate: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  hasUpdated: PropTypes.bool,
  resetAccount: PropTypes.func,
  serverErrors: PropTypes.object,
  regions: PropTypes.array,
  updateUserAccount: PropTypes.func
}

export default TutorAccountForm