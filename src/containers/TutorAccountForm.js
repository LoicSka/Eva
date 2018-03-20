import React, { Component } from 'react'
import TextfieldGroup from '../components/TextfieldGroup'
import validateSignUpInput from '../validations/signUpValidations'
import PropTypes from 'prop-types'
import AvatarInputView from '../components/AvatarInputView'

class TutorAccountForm extends Component {

  onSubmit = (e) => e.preventDefault()

  render() {
    const { serverErrors, translate, currentLanguage } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-4 col-md-3">
                <AvatarInputView />
              </div>
              <div className="col-8 col-md-9">
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">

          </div>
        </div>
      </form>
    )
  }
}

TutorAccountForm.propTypes = {
  translate: PropTypes.func.isRequired,
  serverErrors: PropTypes.object
}

export default TutorAccountForm