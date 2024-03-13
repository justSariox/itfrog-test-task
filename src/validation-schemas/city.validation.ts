export const cityValidationSchema = {
    name: {
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
    description: {
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
            errorMessage: "The length must be at least 3 and no more than 10 characters"
        },
    },

}