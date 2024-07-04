- en cart, en cofirmar pedido, hacer un evento de click y a traves del body se va a mandar this.data, llamando a esta url:

const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken')
      },
      body: JSON.stringify({
        products: this.data
      })
    })

    -hacer una ruta de customer sales routes - para hcer una compra
    -ruta para ver todas las compras
    -ruta para ver una unica compra

para hacer una ruta para hacer la compra

en api src routes ponemos uno nuevo con esto

module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-controller.js')

  router.post('/', controller.create)

  app.use('/api/customer/sales', router)
}

creamos sale controller

____

como se gestionan las ventas, h


- al hacer una venta va a llegar en el cotrolador uncreate que es donde se gestiona. ahora llegan los datos



Como una bbdd va a contemplar las devoluciones?
- interfaz restar y podras devolver 2 de aqui 1 de aqui, clicas al boton y vas a tener los datos:
 - cual es la venta a la cual se hace la devolucion
 - id del prodcuto
 - cantidad de devolucion

 no puedes irte a sale detail y actualizar la venta.

 - crear una tabla de devoluciones - return - sobre un mismo pedido puede haber varias devoluciones
 - se replica lo mismo que en sale, return y return details
 esta devolucion, es para esta venta, se genera una id en return y en details pones para el producto 


 return para una venta y un cliente, referencia propia, cuanto dinero en total estas devolviendo, la fecha y el typo(o tiempo), lo mismo con return detai.js
 en vez de saleDetailId sera returnDetailID

 en carpeta customer en post hay 

 dev-pedidos.com/cliente/productos

 en el controlador:
 req.body.products es un array de elementos
 cada uno de ellos tiene una id, de este array lo que nos interesa es la id y quantity
 tenemos que llegar al calculo total de cuanto es el precio total de la venta. 
 coger la id, 

 hay que generar un arrya de id y guardarlo en una variable, si quiero extraer las id y generar el array donde solo esten las id, usar la funcion:
 hay (reduce, filter, sort,map, find, some)
 usar map

 tenemos req.body.products.map y generar el nuevo array con las id con una variable llamada p
    const productsId = req.body.productos.map(product => product.id)

con sequelize hay el modelo de productos, hay que hacer un findall, where, pasarle el array de id. para que devuelva solo los productos que tengan esa id, (donde id =  array de id)

si tienes cantidad y precio reduce const totalBasePrice, hacer un reduce para exstraer el precio total de la venta

a parte del precio total se necesita 

contraseña noel $08$En.gZTIRQJU8EHFO.UjK3OFwhW/zX2.jL8fHo9tpEc5jTTg4tJwPW

en carts, hay que coger la referencia 


dar al boton de devolver y se tiene que registrar en la tabla que ese peidod ha sido devuelto

_________________________________________________________

neo4j
eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdHRAZ21haWwuY29tIiwibWl4cGFuZWxJZCI6IiRkZXZpY2U6MTkwN2RjZTNjMjA0NzAtMDdlYWMyNzQ1ZTgwMTktMjYwMDFmNTEtMWFlYWEwLTE5MDdkY2UzYzIwNDcwIiwibWl4cGFuZWxQcm9qZWN0SWQiOiI0YmZiMjQxNGFiOTczYzc0MWI2ZjA2N2JmMDZkNTU3NSIsIm9yZyI6InRlc3QiLCJwdWIiOiJuZW80ai5jb20iLCJyZWciOiJ0ZXN0IGVzdHQiLCJzdWIiOiJuZW80ai1kZXNrdG9wIiwiZXhwIjoxNzUxNjMzNzk0LCJ2ZXIiOiIqIiwiaXNzIjoibmVvNGouY29tIiwibmJmIjoxNzIwMDk3Nzk0LCJpYXQiOjE3MjAwOTc3OTQsImp0aSI6IkdsSElIZ19zeiJ9.zY7p-WoBlKfHYcChC-9S4om9zN2ADsLc_CGJMz3jZnMr9h6oGk9WAdf_qog-znhcL1poNaqnZH_XH6UZnjlVST86tZ94L22c4JiUZQyp00_QhSg0Q3mWgBp8JgY9uaLPI21Zr25LAXxrqr-m117IQSl8gGpcLHDVC5TSkuDnIwWMIR52Y8eqICTuc0cUm_ScnVpEZaRL8OD1aLznf3GbtocxA78oUlUYSIGirXIOC4owRkkNZgpGZyE1_9FlgsiyM9Xs3F5w36hBanHRME1lWl2ehXkCJMbMK7KGepfzw0UxG7TKTveJpI52UYguGk0iue_oL01WORiHJCinaJ4ivA


local dbms
pedidos
password
-start

user: neo4j
bolt://localhost:7687
pass: password