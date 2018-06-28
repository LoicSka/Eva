import React from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import validateEmailInput from '../validations/emailValidations'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import merge from 'lodash/merge'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    isValid() {
        const { errors, isValid } = validateEmailInput(this.state)
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid
    }

    onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })

    onSubmit(e) {
        e.preventDefault()
        const { submitForm } = this.props
        let valid = this.isValid()
        if (this.isValid()) {
            submitForm(omit(this.state,['errors']))
        }
    }

    getTranslation = value => value ? this.props.translate(value) : null

    render() {
        const { translate, serverErrors } = this.props
        const { email, errors } = this.state
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
            <button
              type='submit'
              className='btn btn-success btn-block'>
              {translate('userActions.resetPassword')}
            </button>
          </form>
        )
    }
}

LoginForm.propTypes = {
    translate: PropTypes.func.isRequired,
    serverErrors: PropTypes.object,
    submitForm: PropTypes.func.isRequired
}