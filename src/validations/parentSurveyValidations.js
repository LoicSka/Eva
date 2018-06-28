import validator from 'validator'

export default function validateParentSurveyInput(data) {
    let errors = {}
    if (validator.isEmpty(data.regionId)) {
        errors.regionId = 'Region is missing';
    }

    if (validator.isEmpty(data.subjectId)) {
        errors.subjectId = 'Subject is missing';
    }

    if (validator.isEmpty(data.district)) {
        errors.district = 'District missing';
    }

    if (data.daysAvailable.length < 1) {
        errors.daysAvailable = 'Days available are missing';
    }

    if (data.weakPoints.length < 1) {
        errors.weakPoints = 'Weak points are missing';
    }

    if (validator.isEmpty(data.fullName)) {
        errors.fullName = 'Full name missing';
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}