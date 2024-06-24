module.exports = function (sequelize, DataTypes) {
  const Price = sequelize.define('Price', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2)
    },
    current: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'prices',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'prices_productId_fk',
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      }
    ]
  })

  Price.associate = function (models) {
    Price.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    Price.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'priceId' })
  }

  return Price
}
