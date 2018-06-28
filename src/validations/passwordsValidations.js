import validator from 'validator'

export default function validatePasswords(data) {
  let errors = {}

  if (validator.isEmpty(data.password)) {
    errors.password = 'errors.user.password.empty'
  }

  if (data.password.length < 6) {
    errors.password = 'errors.user.password.invalid'
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'errors.user.passwordConfirm.empty'
  }

  if (data.passwordConfirm !== data.password) {
    errors.passwordConfirm = 'errors.user.passwordConfirm.notEqual'
    errors.password = 'errors.user.password.notEqual'
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  }

}