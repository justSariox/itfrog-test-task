export const listValidationSchema = {
    fullName: {
        notEmpty: {
            errorMessage: 'It should not be empty'
        },
        isString: {
            errorMessage: 'Must be string'
        },
        isLength: {
            options: {
                min: 3,
                max: 30
            },
            errorMessage: "The length must be at least 3 and no more than 30 characters"
        },
    },
    shortName: {

        notEmpty: {
            errorMessage: 'It should not be empty'
        },
        isString: {
            errorMessage: 'Must be string'
        },
        isLength: {
            options: {
                min: 3,
                max: 10
            },
            errorMessage: "The length must be at least 3 and no more than 10 characters"
        },
    },
    color: {

        notEmpty: {
            errorMessage: 'It should not be empty'
        },
        isString: {
            errorMessage: 'Must be string'
        },
    },
    cities: {
        isArray: {
            errorMessage: "Must be array"
        }
    },
    'cities.*': {
        isMongoId: true,
        errorMessage: 'report._id is not a valid Mongo ObjectId',
    },

}

