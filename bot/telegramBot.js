const TelegramBot = require('node-telegram-bot-api')
const https = require('https')

// telegram Bot token
const token = process.env.TOKEN  //process.env.DEV

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

module.exports = function telegramBot() {
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
    const response = '<pre>    These Are Available Sensors:    </pre>'

    bot.sendMessage(chatId, response, {
      parse_mode: 'HTML',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{text:'Sensor 1', callback_data: 's1'}],
          [{text:'Sensor 2', callback_data: 's2'}],
          [{text:'Sensor 3', callback_data: 's3'}]
        ]
      })
    })

  })

  // listening on callback button
  bot.on('callback_query', (query) => {
    const chatId = query.from.id
    const message_id = query.message.message_id
    const callback_data = query.data
    global_chatId = chatId

    if(callback_data === 's1' || callback_data === 's2' || callback_data === 's3') {
      let sensor = callback_data.match(/\d+/)
      sensor = sensor[0]
      const sensorURL = `https://afr-pbm-sensor-api.herokuapp.com/api/sensor/${sensor}`

      // make http GET request
      const url =  `https://afr-pbm-sensor-api.herokuapp.com/api/sensor/${sensor}/data`
      https.get(url, (res) => {
        res.on('data', d => {
          d = JSON.parse(Buffer.from(d, 'base64').toString('ascii'))
          const res = `<pre>    Data Pada Sensor ${d.sensor}:    </pre>`

          bot.editMessageText(res, {
            chat_id: chatId,
            message_id: message_id,
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [{text: d.data, url: sensorURL}],
                [{text:'<< Back', callback_data: 'back'}]
              ]
            })
          })
        
        })
      
        res.on('end', () => {
          console.log('request completed')
        })

      }).on('error', error => {
        console.error(error)
      })

    } else if(callback_data === 'back') {
      const response = '<pre>    These Are Available Sensors:    </pre>'

      bot.editMessageText(response, {
        chat_id: chatId,
        message_id: message_id,
        parse_mode: 'HTML',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{text:'Sensor 1', callback_data: 's1'}],
            [{text:'Sensor 2', callback_data: 's2'}],
            [{text:'Sensor 3', callback_data: 's3'}]
          ]
        })
      })
    }


  })

  bot.on("polling_error", (err) => console.log(err))

}