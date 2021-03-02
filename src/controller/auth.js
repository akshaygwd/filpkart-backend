const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const bcrypt  = require('bcrypt');
const { body, validationResult, check } = require('express-validator');
env.config();

exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec(async (error, user) => {
        if(user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const hash_password = await bcrypt.hash(password, 10);

        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: Math.random().toString()
        });

        _user.save((error, data) => {
            if(error) {
                return res.status(400).json({
                    message: 'somthing went wrong'
                })
            }
            if(data) {
                return res.status(201).json({
                    message: 'User created Successfully'
                })
            }
        });
    })
}


exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({error})

        if(user) {
            if(user.authenticate(req.body.password)) {
                const token = jwt.sign({
                    _id: user._id,
                    role: user.role
                },
                process.env.JET_SECRET,
                {expiresIn: '1h'}
                );

                const { _id, firstName, lastName, email, role, fullName } = user;

                return res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                })
            } else {
                return res.status(400).json({
                    message: "invalid password"
                })
            }
        }else {
            return res.status(400).json({message: 'somthing went wrong'})
        }
    })
}
