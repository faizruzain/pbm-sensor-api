// ======================================= dotenv for security =======================================
require('dotenv').config()
// ======================================= dotenv for security =======================================

// ============================================== Modules ==============================================
const express = require('express')
const path = require('path')
const telegramBot = require('./bot/telegramBot')
// ============================================== Modules ==============================================

// =================================== express server configuration ===================================
const app = express()
const homeRoute = require('./routes/home')
const apiRoute = require('./routes/api')
const errorRoute = require('./routes/404')
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

// app.use(telegramBot)
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, './public')))
app.use('/', homeRoute)
app.use('/api', apiRoute)
app.use('*', errorRoute)
// =================================== express server configuration ===================================

// ========================================== Telegram Bot ==========================================
// run telegram Bot
telegramBot()
// ========================================== Telegram Bot ==========================================

app.listen(port)