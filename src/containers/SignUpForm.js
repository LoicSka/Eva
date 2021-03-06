import React from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import validateSignUpInput from '../validations/signUpValidations'
import { Link } from 'react-router-dom'
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
      locale: props.currentLanguage,
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

  onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })

  onSubmit(e) {
    e.preventDefault()
    const { submitUserForm, currentLanguage } = this.props
    this.setState({locale: currentLanguage})
    let valid = this.isValid()
    if (this.isValid()) {
      submitUserForm(omit(this.state,['errors']))
    }
  }

  componentWillReceiveProps = (newProps) => {
    const { currentLanguage } = newProps
    if (currentLanguage !== this.state.currentLanguage) {
      this.setState({locale: currentLanguage})
    }
  }

  getTranslation = value => value ? this.props.translate(value) : null

  render() {
    const { translate, serverErrors, authenticating } = this.props
    const { email, firstName, lastName, password, errors } = this.state
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
          disabled={authenticating}>{authenticating ? translate('userActions.signingUp') : translate('userActions.signup')}
        </button>
        <span className="small" id="terms">{translate('userActions.agreed')} <Link to='/signup'>{translate('userActions.terms')}</Link></span>
      </form>
    )
  }
}

SignUpForm.propTypes = {
  translate: PropTypes.func.isRequired,
  serverErrors: PropTypes.object,
  authenticating: PropTypes.bool,
  submitUserForm: PropTypes.func.isRequired
}
