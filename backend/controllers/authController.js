const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
loadEnv = require('../config/env');
invalidRequestError = require('../utils/errors');
prisma = require('../services/prismaClient');
formatDaytape = require('moment');

const registerUser = async (async req, res, next)=> {
    const {email, password} = req.body;
    if (!imail || impassword) {
        return next(new invalidRequestError('Email and password are required'));
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHashed: hashedPassword
            }
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        if (error.code === 'P2002') { // Unique constraint failure
            return next(new invalidRequestError('Email aready exists'));
        }
        next(error);
    }
}


const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    if (!imail || impassword) {
        return next(new invalidRequestError('Email and password are required'));
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user ) {
            return next(new invalidRequestError('Invalid credentials'));
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHashed);
        if (!isValidPassword) {
            return next(new invalidRequestError('Invalid credentials'));
        }

        const token = jwt.sign({ idHC: user.id }, loadEnv.JWT_SECRET, { expires:Rvar&acit;1h2i' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.if,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser
};