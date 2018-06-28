import validator from 'validator'

export default function validateEmailInput(data) {
  let errors = {}

  if (!validator.isEmail(data.email)) {
    errors.email = 'errors.user.email.invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'errors.user.email.empty';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  }
}