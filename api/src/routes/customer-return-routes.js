module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/return-controller.js')

  router.post('/', controller.create)
  router.get('/', controller.findByCustomer)
  router.get('/details/:returnId', controller.findReturnDetails)

  app.use('/api/customer/returns', router)
}