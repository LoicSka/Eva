import React from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import validateLoginInput from '../validations/loginValidations'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import merge from 'lodash/merge'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  isValid() {
    const { errors, isValid } = validateLoginInput(this.state)
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid
  }

  onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })

  onSubmit(e) {
    e.preventDefault()
    const { submitUserForm } = this.props
    let valid = this.isValid()
    if (this.isValid()) {
      submitUserForm(omit(this.state,['errors']))
    }
  }

  getTranslation = value => value ? this.props.translate(value) : null

  render() {
    const { translate, serverErrors, authenticating } = this.props
    const { email, password, errors } = this.state
    const combinedErrors = merge(errors, serverErrors)
    return (
      <form onSubmit={this.onSubmit}>
        <TextfieldGroup
          error={this.getTranslation(combinedErrors.email)}
          value={email}
          placeholder='123@example.com'
          onChange={this.onChange}
          field='email'
          type='email'
          label={translate('userFields.email')}
        />
        <TextfieldGroup
          error={this.getTranslation(combinedErrors.password)}
          value={password}
          onChange={this.onChange}
          field='password'
          type='password'
          label={translate('userFields.createPassword')}
        />
        <button
          type='submit'
          className='btn btn-success btn-block'
          disabled={authenticating}>{authenticating ? translate('userActions.logingIn') : translate('userActions.login')}
        </button>
        <span className="small mt-4" id="terms">{translate('userActions.forgotPassword')}<Link to='/recoveries/new'> {translate('userActions.clickHere')}</Link></span>
      </form>
    )
  }
}

LoginForm.propTypes = {
  translate: PropTypes.func.isRequired,
  serverErrors: PropTypes.object,
  authenticating: PropTypes.bool,
  submitUserForm: PropTypes.func.isRequired
}
