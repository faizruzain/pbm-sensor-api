const express = require('express')
const router = express.Router()

// global var for storing sensor data
// since I don't have db yet XD
let sensor1
let sensor2
let sensor3

// non json response with GUI
router.get('/sensor/:num', (req, res) => {
  const sensor = parseInt(req.params.num)

  if(sensor === 1) {
    res.render('sensors', {
      sensor: sensor,
      value: sensor1
    })
  } else if(sensor === 2) {
    res.render('sensors', {
      sensor: sensor,
      value: sensor2
    })
  } else if(sensor === 3) {
    res.render('sensors', {
      sensor: sensor,
      value: sensor3
    })
  } else {
    res.render('sensors', {
      sensor: null
    })
  }
  
})

// json respon
router.route('/sensor/:num/data')
  .get((req, res) => {
    const sensor = parseInt(req.params.num)

    if(sensor === 1) {
      res.json({
        sensor: 1,
        data: sensor1 === undefined ? 'test' : sensor1
      })
    } else if(sensor === 2) {
      res.json({
        sensor: 2,
        data: sensor2 === undefined ? 'test' : sensor2
      })
    } else if(sensor === 3) {
      res.json({
        sensor: 3,
        data: sensor3 === undefined ? 'test' : sensor3
      })
    } else {
      res.json({value: null})
    }

  })
  .post((req, res) => {
    console.log(req.body)
    // sensor1 = req.body.sensor1.value
    // sensor2 = req.body.sensor2.value
    // sensor3 = req.body.sensor3.value
    sensor1 = req.body.value1
    sensor2 = req.body.value2
    sensor3 = req.body.value3

    res.send({message: `we got your data`})
  })

module.exports = router