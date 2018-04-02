import validator from 'validator'

export default function validateTutorAccountInput(data) {
  let errors = {}

  if (validator.isEmpty(data.email)) {
    errors.email = 'errors.user.email.empty';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'errors.user.email.invalid';
  }

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = 'errors.user.firstName.empty';
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = 'errors.user.lastName.empty';
  }

  if (validator.isEmpty(data.introduction)) {
    errors.introduction = 'errors.user.introduction.empty';
  }
  
  if (data.introduction.length > 500) {
    errors.introduction = 'errors.user.introduction.invalid';
  }

  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'errors.user.phoneNumber.empty';
  }

  if (validator.isEmpty(data.occupation)) {
    errors.occupation = 'errors.user.occupation.empty';
  }

  if (validator.isEmpty(data.regionId)) {
    errors.region = 'errors.user.region.empty';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  }

}