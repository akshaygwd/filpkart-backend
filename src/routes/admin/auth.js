const express = require('express');
const router = express.Router();
const { validatorSignupRequest, isRequestValidated, validatorSigninRequest } = require('../../validator/auth');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { requireSignn } = require('../../common-middleware');

router.post('/admin/signin', validatorSigninRequest, isRequestValidated, signin);

router.post('/admin/signup', validatorSignupRequest, isRequestValidated, signup);
router.post('/admin/signout', signout);


module.exports = router;