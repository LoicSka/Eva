import React, { Component } from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import TextareaGroup from '../components/TextareaGroup'
import SelectfieldGroup from '../components/SelectfieldGroup'
import validateTutorAccountInput from '../validations/tutorAccountValidations'
import PropTypes from 'prop-types'
import AvatarInputView from './AvatarInputView'
import { merge, lowerCase, omit, isEmpty, findLast, keys, values, flattenDeep} from 'lodash'
import * as moment from 'moment'
import 'moment/locale/zh-cn'

var china = require('china-province-city-district');
const countries = require("country-list")()

class TutorAccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      occupation: '',
      introduction: '',
      phoneNumber: '',
      hourlyRate: null,
      countryOfOrigin: '',
      regionId: '',
      district: '',
      createdAt: '',
      errors: {},
      levels: [],
      subjectIds: [],
      teachingExperience: '',
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

  componentWillReceiveProps = (newProps) => {
    const { regions } = newProps
    const regionIds = keys(regions)
    this.setupLocale()
    if (this.state.regionId.length === 0 && regionIds.length > 0) {
        this.setState({regionId: regionIds[0]});
    }
  }

  render() {
    const { translate, currentLanguage, isUpdating, hasUpdated, serverErrors, regions, resetAccount } = this.props
    const { firstName, lastName, email, gender, introduction, phoneNumber, weiboUrl, wechatId, regionId, countryOfOrigin, district, occupation, errors, saving, hourlyRate } = this.state

    const combinedErrors = merge(errors, serverErrors)
    const countryNames = countries.getNames()
    const region = findLast(regions, (n) => n.value === regionId)
    const districtList = typeof (region) !== 'undefined' ? china.query(region.symbol) : []
    const createdAt = moment(this.state.createdAt).format('LL')


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
                <TextfieldGroup
                  error={this.getTranslation(combinedErrors.wechatId)}
                  value={wechatId}
                  onChange={this.onChange}
                  field='wechatId'
                  type='text'
                  label={`${translate('userFields.wechatId')} *`}
                />
                <TextfieldGroup
                  error={this.getTranslation(combinedErrors.weiboUrl)}
                  value={weiboUrl}
                  onChange={this.onChange}
                  field='weiboUrl'
                  type='text'
                  label={`${translate('userFields.weibo')} *`}
                />
                <SelectfieldGroup
                  error={this.getTranslation(combinedErrors.gender)}
                  value={gender}
                  onChange={this.onChange}
                  field='gender'
                  options={[{ value: 'male', name: translate('userFields.male') }, { value: 'female', name: translate('userFields.female') }]}
                  type='text'
                  label={`${translate('userFields.gender')} *`}
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
                  error={this.getTranslation(combinedErrors.hourlyRate)}
                  value={hourlyRate}
                  onChange={this.onChange}
                  field='hourlyRate'
                  type='number'
                  label={`${translate('userFields.hourlyRate')} *`}
                />
                <TextfieldGroup
                  error={this.getTranslation(combinedErrors.phoneNumber)}
                  value={phoneNumber}
                  onChange={this.onChange}
                  field='phoneNumber'
                  type='number'
                  label={`${translate('userFields.phoneNumber')} *`}
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
                  error={this.getTranslation(combinedErrors.district)}
                  value={district}
                  onChange={this.onChange}
                  field='district'
                  options={districtList}
                  type='text'
                  label={translate('userFields.district')}
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
