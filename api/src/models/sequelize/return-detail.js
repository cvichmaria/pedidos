module.exports = function (sequelize, DataTypes) {
    const ReturnDetail = sequelize.define('ReturnDetail', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      returnId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      priceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      basePrice: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      tableName: 'return_details',
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
          name: 'return_details_returnId_fk',
          using: 'BTREE',
          fields: [
            { name: 'returnId' }
          ]
        },
        {
          name: 'return_details_productId_fk',
          using: 'BTREE',
          fields: [
            { name: 'productId' }
          ]
        },
        {
          name: 'return_details_priceId_fk',
          using: 'BTREE',
          fields: [
            { name: 'priceId' }
          ]
        }
      ]
    })
  
    ReturnDetail.associate = function (models) {
      ReturnDetail.belongsTo(models.Return, { as: 'return', foreignKey: 'returnId' })
      ReturnDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
      ReturnDetail.belongsTo(models.Price, { as: 'price', foreignKey: 'priceId' })
    }
  
    return ReturnDetail
  }
  