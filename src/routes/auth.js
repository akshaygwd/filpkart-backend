const express = require('express');
const router = express.Router();
const { validatorSignupRequest, isRequestValidated, validatorSigninRequest } = require('../validator/auth');
const { signup, signin } = require('../controller/auth');



router.post('/signin', validatorSigninRequest, isRequestValidated, signin);

router.post('/signup', validatorSignupRequest, isRequestValidated, signup);

// router.post('/profile',requireSignn , (req, res) => {
//     console.log(req.user, 'hit');
//     res.status(200).json({user: 'profile'})
// })

module.exports = router;