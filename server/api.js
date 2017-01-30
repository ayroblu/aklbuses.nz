const express = require('express')
const router = express.Router()
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

let store = {}

router.get('/vehicles', function(req, res, next) {
  res.json(store.locations || {})
})
router.get('/routes', function(req, res, next) {
  res.json(store.routes)
})

module.exports = st=>{
  store = st
  return router
}

