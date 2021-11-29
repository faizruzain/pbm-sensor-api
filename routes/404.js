const express = require('express')
const router = express.Router()

// error route
router.get('*', (req, res) => {
  res.status(404).render('error', {
    code: '404',
    message: 'Page Not Found'
  })
})

module.exports = router
