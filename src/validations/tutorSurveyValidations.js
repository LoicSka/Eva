import validator from 'validator'

export default function validateTutorSurveyInput(data) {
    let errors = {}

    if (validator.isEmpty(data.district)) {
        errors.district = 'District missing';
    }

    if (validator.isEmpty(data.occupation)) {
        errors.occupation = 'Occupation is missing';
    }

    if (validator.isEmpty(String(data.teachingExperience))) {
        errors.teachingExperience = 'Teaching Experience is missing';
    }

    if (data.levels.length < 1) {
        errors.levels = 'Levels are missing';
    }

    if (data.daysAvailable.length < 1) {
        errors.daysAvailable = 'Days available are missing';
    }

    if (validator.isEmpty(data.wechatId)) {
        errors.wechatId = 'Wechat Id is missing';
    }

    if (validator.isEmpty(data.regionId)) {
        errors.regionId = 'Region Id Id is missing';
    }

    if (validator.isEmpty(data.gender)) {
        errors.gender = 'gender is missing';
    }

    if (validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = 'Phone number is missing';
    }

    if (!data.hourlyRate) {
        errors.hourlyRate = 'Hourly rate is missing';
    }

    if (validator.isEmpty(data.introduction)) {
        errors.introduction = 'Introduction number is missing';
    }

    if (validator.isEmpty(data.countryOfOrigin)) {
        errors.countryOfOrigin = 'countryOfOrigin number is missing';
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}