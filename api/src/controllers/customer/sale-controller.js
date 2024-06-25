const sequelizeDb = require('../../models/sequelize')
const CustomerProduct = sequelizeDb.Product
const Sale = sequelizeDb.Sale
const SaleDetail = sequelizeDb.SaleDetail
const Op = sequelizeDb.Sequelize.Op

exports.create = async (req, res) => {
  try {
    console.log(req.body.products)
    const productsId = req.body.productos.map(product => product.id)
  } catch (err) {

  }


  const products = await CustomerProduct.findAll({
    where: {
      id: {
        [Op.in]: productsId
      }
    }
  })

  const currentDateTime = new Date()
  let totalBasePrice = products.reduce((acc, product) => {
    const price = product.price.basePrice;
    const quantity = product.dataValues.quantity;
    return acc + (price * quantity);
  }, 0);
  totalBasePrice = totalBasePrice.toFixed(2);

  const saleData = {
    customerId: 1,
    reference: '0000000002',
    totalBasePrice: parseFloat(totalBasePrice).toFixed(2),
    saleDate: currentDateTime.toISOString().slice(0, 10),
    saleTime: currentDateTime.toTimeString().slice(0, 8)
  }

  const sale = await Sale.create(saleData)

  const saleDetailsData = products.map(product => {

    const saleDetailData = {
      saleId: sale.dataValues.id,
      productId: product.id,
      priceId: product.price.dataValues.id,
      productName: product.dataValues.name,
      basePrice: product.price.dataValues.basePrice,
      quantity: product.dataValues.quantity
    }

    return saleDetailData
  })

  await SaleDetail.bulkCreate(saleDetailsData)

  res.status(201).send(sale)

}