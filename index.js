const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();

// Check if the token is provided
const {checkToken} = require('./Middleware/token');

//Import Routes
const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/user')
const publicRoutes = require('./Routes/public');
// const cronRoutes = require('./Routes/cron');

//Middleware
app.use(express.json())
app.use(cors());
// app.use('/api/cron', cronRoutes);
app.use('/auth', authRoutes);
app.use(checkToken);
app.use('/api/user', userRoutes);
app.use('/api/public', publicRoutes);

//Hosting PORT
const port = process.env.PORT;  //3000 for local
app.listen(port);
