// ======================================= dotenv for security =======================================
require('dotenv').config()
// ======================================= dotenv for security =======================================

// Modules
const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const path = require('path')
const https = require('https')
// ========================================== Telegram Bot ==========================================
// telegram Bot token
const token = process.env.TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

// receiving command from Bot
let global_chatId

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  global_chatId = msg.chat.id
  const response = `hello ${msg.from.username}`

  bot.sendMessage(chatId, response)
})

bot.onText(/\/show_sensors/, (msg) => {
  const chatId = msg.chat.id
  const response = `these are sensors available`

  bot.sendMessage(chatId, response, {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text:'Sensor 1', callback_data: 'Sensor 1'}],
        [{text:'Sensor 2', callback_data: 'Sensor 2'}],
        [{text:'Sensor 3', callback_data: 'Sensor 3'}]
      ]
    })
  })
})

// bot.onText(/sensor (.+)/i, (msg, match) => {
//   const chatId = msg.chat.id
//   global_chatId = msg.chat.id

//   const opt = {parse_mode : "HTML"}
//   const sensor = msg.text.match(/\d+/)
//   const res = `<a href="http://127.0.0.1:3000/api/sensor/${sensor[0]}">Sensor ${sensor[0]}</a>`
//   bot.sendMessage(chatId, res, opt)

// })

// listening on callback button
bot.on('callback_query', (query) => {
  const chatId = query.from.id
  global_chatId = chatId
  const sensor = query.data.match(/\d+/)
  const options = {
    hostname: `https://afr-pbm-sensor-api.herokuapp.com`,
    port: 443,
    path: `/api/sensor/${sensor[0]}/data`,
    method: 'GET'
  }

  const req = https.request(options, res => {
    res.on('data', d => {
      d = JSON.parse(Buffer.from(d, 'base64').toString('ascii'))
      const res = `Pembacaan Sensor ${d.sensor} saat ini dengan data ${d.data}`
      bot.sendMessage(chatId, res, {parse_mode : "HTML"})
    })
  })

  req.on('error', error => {
    console.error(error)
  })
  
  req.end()
  // console.log(query)
  // const chatId = query.from.id
  // global_chatId = chatId
  // const opt = {parse_mode : "HTML"}
  // const sensor = query.data.match(/\d+/)
  // const res = `<a href="http://127.0.0.1:3000/api/sensor/${sensor[0]}">Sensor ${sensor[0]}</a>`
  // bot.sendMessage(chatId, res, opt)

  // bot.editMessageReplyMarkup({
  //   reply_markup: [
  //     [{text: 'Sensor 1', callback_data: '1'}],
  //     [{text: '<< Back', callback_data: 'back'}]
  //   ]
  // },
  // {
  //   chat_id: chatId,
  //   message_id: query.message.message_id
  // })
})

bot.on("polling_error", (err) => console.log(err))
// ========================================== Telegram Bot ==========================================

// =================================== express server configuration ===================================
const app = express()
const port = process.env.PORT || 3000
// to catch incoming POST data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, './public')))
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')
// =================================== express server configuration ===================================

// home route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Express'
  })
})

app.get('/api/sensor/:num', (req, res) => {
  const sensor = parseInt(req.params.num)

  if(sensor === 1) {
    // bot.sendMessage(global_chatId, `Pembacaan Sensor ${sensor}`)
    res.render('sensors', {
      sensor: sensor
    })
  } else if(sensor === 2) {
    // bot.sendMessage(global_chatId, `Pembacaan Sensor ${sensor}`)
    res.render('sensors', {
      sensor: sensor
    })
  } else if(sensor === 3) {
    // bot.sendMessage(global_chatId, `Pembacaan Sensor ${sensor}`)
    res.render('sensors', {
      sensor: sensor
    })
  } else {
    res.render('sensors', {
      sensor: null
    })
  }
  
})

// route for GET sensor data as json
app.get('/api/sensor/:num/data', (req, res) => {
  const sensor = parseInt(req.params.num)

  if(sensor === 1) {
    res.json({
      sensor: 1,
      data: 'test'
    })
  } else if(sensor === 2) {
    res.json({
      sensor: 2,
      data: 'test'
    })
  } else if(sensor === 3) {
    res.json({
      sensor: 3,
      data: 'test'
    })
  } else {
    res.json({value: null})
  }
  
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.status(404).render('error', {
    code: '404',
    message: 'Page Not Found'
  })
})


app.listen(port)