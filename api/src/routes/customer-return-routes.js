module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/return-controller.js')
  // const authCustomerJwt = require('../middlewares/auth-customer-jwt.js')
  // [authCustomerJwt.verifyCustomerToken]

  router.post('/:saleId', controller.create)

  app.use('/api/customer/returns', router)
}