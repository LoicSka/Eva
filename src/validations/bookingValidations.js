import validator from 'validator'

export default function validateBookingInput(data) {
  let errors = {}

  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'errors.booking.phoneNumber.empty'
  }

  if (validator.isEmpty(data.address)) {
    errors.address = 'errors.booking.address.empty'
  }

  if (data.selectedDay && new Date() > new Date(data.selectedDay) ) {
    errors.selectedDay = 'errors.booking.date.past'
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'errors.booking.time.empty'
  }

  if (validator.isEmpty(data.to)) {
    errors.to = 'errors.booking.time.empty'
  }

  if (!validator.isEmpty(data.from) && !validator.isEmpty(data.to)) {
    if (Number(data.to) <=  Number(data.from )) {
      errors.to = 'errors.booking.time.invalid'
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}