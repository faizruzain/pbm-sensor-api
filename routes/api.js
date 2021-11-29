const express = require('express')
const router = express.Router()

// non json response with GUI
router.get('/sensor/:num', (req, res) => {
  const sensor = parseInt(req.params.num)

  if(sensor === 1) {
    res.render('sensors', {
      sensor: sensor
    })
  } else if(sensor === 2) {
    res.render('sensors', {
      sensor: sensor
    })
  } else if(sensor === 3) {
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
router.get('/sensor/:num/data', (req, res) => {
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

module.exports = router