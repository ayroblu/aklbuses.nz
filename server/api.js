const express = require('express')
const router = express.Router()

const store = {}

router.get('/vehicles', function(req, res, next) {
  res.json({locations: store.locations})
})
router.get('/routes', function(req, res, next) {
  res.json({routes: store.routes})
})

module.exports = st=>{
  Object.assign(store, st)
  return router
}

