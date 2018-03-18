import React from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import validateSignUpInput from '../validations/signUpValidations'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import merge from 'lodash/merge'

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      isLoading: false,
      errors: {}
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  isValid() {
    const { errors, isValid } = validateSignUpInput(this.state)
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid
  }

  onChange(e) {
    this.setState({[[e.target.name]]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault()
    const { submitUserForm } = this.props
    this.setState({errors: {}})
    if (this.isValid()) {
      submitUserForm(omit(this.state,['isLoading', 'errors']))
    }
  }

  getTranslation = value => value ? this.props.translate(value) : null

  render() {
    const { serverErrors } = this.props
    const { translate } = this.props
    const { email, firstName, lastName, password, errors, isLoading } = this.state
    const combinedErrors = merge(serverErrors, errors)
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
        <div className="form-row">
          <TextfieldGroup
            error={this.getTranslation(combinedErrors.firstName)}
            value={firstName}
            onChange={this.onChange}
            field='firstName'
            type='text'
            label={translate('userFields.firstName')}
            layout={2}
          />
          <TextfieldGroup
            error={this.getTranslation(combinedErrors.lastName)}
            value={lastName}
            onChange={this.onChange}
            field='lastName'
            type='text'
            label={translate('userFields.lastName')}
            layout={2}
          />
        </div>
        <TextfieldGroup
          error={this.getTranslation(combinedErrors.password)}
          value={password}
          onChange={this.onChange}
          field='password'
          type='password'
          label={translate('userFields.createPassword')}
          subLabel={translate('userFields.passwordDesc')}
        />
        <button
          type='submit'
          className='btn btn-success btn-block'
          disabled={isLoading}>{isLoading ? 'Signing up...' : translate('userActions.signUp')}
        </button>
        <span className="small" id="terms">You are agreeing to our <a href="https://google.com">Terms of Services</a></span>
      </form>
    )
  }
}

SignUpForm.propTypes = {
  translate: PropTypes.func.isRequired,
  serverErrors: PropTypes.object,
  submitUserForm: PropTypes.func.isRequired,
}