const express=require('express')
const cors = require('cors')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()
// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'))
// Test route
app.get('/health', (req, res) => {
    res.json({ message: 'Auth service is running!' })
})
// Connect to MongoDB and start server
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Auth service running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error)
    })