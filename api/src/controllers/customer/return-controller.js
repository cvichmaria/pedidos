const sequelizeDb = require('../../models/sequelize')
const Product = sequelizeDb.Product
const Return = sequelizeDb.Return
const ReturnDetail = sequelizeDb.ReturnDetail
const Op = sequelizeDb.Sequelize.Op


exports.findByCustomer = (req, res) => {
  const returnWhereStatement = {}
  returnWhereStatement.deletedAt = { [Op.is]: null }
  returnWhereStatement.customerId = 1

  for (const key in req.query) {
    if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
      returnWhereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  Return.findAll({
    where: returnWhereStatement,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findReturnDetails = (req, res) => {
  const returnWhereStatement = {}
  returnWhereStatement.deletedAt = { [Op.is]: null }
  returnWhereStatement.returnId = req.params.returnId

  ReturnDetail.findAll({
    where: returnWhereStatement,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.create = async (req, res) => {
  try {
    const productsIds = req.body.products.map(product => product.id)
    const productWhereStatement = {}
    productWhereStatement.deletedAt = { [Op.is]: null }
    productWhereStatement.visible = true
    productWhereStatement.id = { [Op.in]: productsIds }
    let products = await Product.findAll({
      where: productWhereStatement,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: sequelizeDb.Price,
          as: 'prices',
          required: true,
          where: {
            deletedAt: null
          }
        }
      ]
    })

    if (products.length !== productsIds.length) {
      res.status(400).send({
        message: 'Algunos productos no existen o no están disponibles.'
      })
      return
    }

    const returnData = {
      customerId: req.body.customerId,
      returnDate: req.body.returnDate,
      returnTime: req.body.returnTime
    }

    let newReturn = await Return.create(returnData)

    for (const product of products) {
      const returnDetailData = {
        returnId: newReturn.id,
        productId: product.id,
        priceId: product.prices[0].id,
        quantity: req.body.products.find(p => p.id === product.id).quantity
      }

      await ReturnDetail.create(returnDetailData)
    }

    res.status(201).send(newReturn)
  } catch (err) {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al crear la devolución.'
    })
  }
}