const { validationResult, check } = require('express-validator');

exports.validatorSignupRequest = [
    check('firstName').notEmpty().withMessage('firstname is required'),
    check('lastName').notEmpty().withMessage('lastname is required'),
    check('email').isEmail().withMessage('valid email is required'),
    check('password').isLength({min: 6}).withMessage('Password must be 6 character atleast'),
];

exports.validatorSigninRequest = [
    check('email').isEmail().withMessage('valid email is required'),
    check('password').isLength({min: 6}).withMessage('Password must be 6 character atleast'),
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({error: errors.array()[0].msg})
    }

    next();
}