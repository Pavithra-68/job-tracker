const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
const register = async (req, res) => {
    try {
        // Step 1 - Get data from request body
        const { name, email, password } = req.body

        // Step 2 - Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists' 
            })
        }

        // Step 3 - Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Step 4 - Save new user to MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Step 5 - Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Step 6 - Return success message + token
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        })
    }
}

// LOGIN
const login = async (req, res) => {
    try {
        // Step 1 - Get email and password from request body
        const { email, password } = req.body

        // Step 2 - Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            })
        }

        // Step 3 - Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            })
        }

        // Step 4 - Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Step 5 - Return success message + token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        })
    }
}

module.exports = { register, login }