import validator from 'validator'

export default function validateCourseInput(data) {
  let errors = {}

  if (validator.isEmpty(data.title)) {
    errors.title = 'errors.course.title.empty'
  }

  if (validator.isEmpty(data.subject)) {
    errors.subject = 'errors.course.subject.empty'
  }

  if (!data.teachingExperience) {
    errors.teachingExperience = 'errors.course.teachingExperience.empty'
  }
  
  if (!data.ageGroup) {
    errors.ageGroup = 'errors.course.ageGroup.empty'
  }

  if (!data.hourlyRate) {
    errors.hourlyRate = 'errors.course.hourlyRate.empty'
  }

  if (!data.expertise) {
    errors.expertise = 'errors.course.expertise.empty'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}