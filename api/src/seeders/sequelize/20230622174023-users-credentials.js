'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_credentials', [
      {
        id: 1,
        userId: '1',
        email: 'cristinavich.m@gmail.com',
        password: '$2a$08$En.gZTIRQJU8EHFO.UjK3OFwhW/zX2.jL8fHo9tpEc5jTTg4tJwPW',
        lastPasswordChange: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_credentials', null, {})
  }
}

// TODO:
// levantar gameshop - npm run dev
// cd api npm run dev
// si entras en devpedidos,/admin/usuarios
// hay que crear un usuario
// admin/client.html
// creas un registro nuevo
// ir a gmail para ver el email
// poner contraseña de noel
// hacemos npx sequelize-cli db:seed:all en api/src