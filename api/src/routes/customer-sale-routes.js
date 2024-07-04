module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-controller.js')
  // const authCustomerJwt = require('../middlewares/auth-customer-jwt.js')
  // [authCustomerJwt.verifyCustomerToken]

  router.post('/', controller.create)
  router.get('/', controller.findByCustomer)
  router.get('/details/:saleId', controller.findSaleDetails)

  app.use('/api/customer/sales', router)
}