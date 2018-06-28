import React, { Component } from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import validatePasswords from '../validations/passwordsValidations'
import PropTypes from 'prop-types'
import { merge, lowerCase, omit, isEmpty, findLast, values, flattenDeep} from 'lodash'

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          password: '',
          passwordConfirm: '',
          updatedAt: null,
          saving: false,
          errors: {}
        }
    }

    onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })
    getTranslation = value => value ? this.props.translate(value) : null

    isValid() {
        const { errors, isValid } = validatePasswords(this.state)
        if (!isValid) {
            this.setState({ errors })
        }
        return isValid
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { submitForm, userId} = this.props
        if (this.isValid()) {
            this.setState({ errors: {}, saving: true })
            submitForm(omit(this.state, ['errors', 'createdAt', 'updatedAt', 'regionName']), userId)
        }
    }

    render() {
        const { translate, currentLanguage, serverErrors } = this.props
        const { password, confirmPassword, errors, saving } = this.state
        const combinedErrors = merge(errors, serverErrors)
    
        return (
          <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12 px-3 mt-2">
                    <form onSubmit={this.onSubmit}>
                        <TextfieldGroup
                        error={this.getTranslation(combinedErrors.password)}
                        value={password}
                        onChange={this.onChange}
                        field='password'
                        type='password'
                        label={`${translate('userFields.password')} *`}
                        />
                        <TextfieldGroup
                        error={this.getTranslation(combinedErrors.passwordConfirm)}
                        value={confirmPassword}
                        onChange={this.onChange}
                        field='passwordConfirm'
                        type='password'
                        label={`${translate('userFields.passwordConfirm')} *`}
                        />
                    <button
                        type='submit'
                        className='btn btn-success btn-block mt-4'>
                            {translate('userActions.save')}
                        </button>
                    </form>
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

ResetPasswordForm.propTypes = {
    userID: PropTypes.string,
    translate: PropTypes.func.isRequired,
    serverErrors: PropTypes.object,
    submitForm: PropTypes.func
  }
  
  export default ResetPasswordForm