import validator from 'validator'

export default function validateLoginInput(data) {
  let errors = {}

  if (validator.isEmpty(data.email)) {
    errors.email = 'errors.user.email.empty';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'errors.user.email.invalid';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'errors.user.password.empty';
  }

  if (data.password.length < 6) {
    errors.password = 'errors.user.password.invalid';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  }
}