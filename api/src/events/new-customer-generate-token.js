const EmailService = require('../services/email-service')

exports.handleEvent = async (redisClient, subscriberClient) => {
  subscriberClient.subscribe('new-customer-token', (err) => {
    if (err) {
      console.error('Error al suscribirse al canal:', err)
    }
  })

  subscriberClient.on('message', async (channel, message) => {
    if (channel === 'new-customer-token') {
      const emailService = new EmailService('gmail')
      const data = JSON.parse(message)

      emailService.sendEmail(data.customer, 'customer', 'activationUrl', data)
    }
  })
}

// const AuthorizationService = require('../services/authorization-service')

// exports.handleEvent = async (redisClient, subscriberClient) => {
//   subscriberClient.subscribe('new-customer', (err) => {
//     if (err) {
//       console.error('Error al suscribirse al canal:', err)
//     }
//   })

//   subscriberClient.on('message', async (channel, message) => {
//     if (channel === 'new-customer') {
//       const customer = JSON.parse(message)

//       const authorizationService = new AuthorizationService()
//       const activationUrl = await authorizationService.createActivationToken(customer.id, 'customer')
//       console.log('activationUrl',activationUrl)

//       redisClient.publish('new-customer-token', JSON.stringify({
//         activationUrl,
//         customer
//       }))
//     }
//   })
// }