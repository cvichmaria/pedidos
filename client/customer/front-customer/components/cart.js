import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store.js'
class Cart extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.unsubscribe = null
  }

  connectedCallback () {

    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (!isEqual(currentState.cart.cartProducts, this.products)) {
        this.products = currentState.cart.cartProducts
        this.updateCart(this.products)
      }
    })
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        
      </style>
      <button class="order-button">Ver pedido</button>
      <div class="cart-container">
        <div class="cart">
          <header class="cart-header">
            <h3>Tu pedido</h3>
            <button class="close">X</button>
          </header>
          <div class="product-gallery"></div>
          <p class="total">Total: ${this.products ? this.products.reduce((sum, product) => sum + (product.price * product.quantity), 0) : 0}€</p>
          <button class="buy-button">Finalizar pedido</button>
        </div>
      </div>
      <div class="modal-background">
        <div class="modal">
          <header class="modal-header">
            <h3>Pedido realizado</h3>
            <button class="close-modal">x</button>
          </header>
          <main class="modal-main">
            <h5 class="modal-title">¡Gracias por comprar con nosotros!</h5>
            <p>Su pedido ha sido realizado con éxito</p>
          </main>
        </div>
      </div>
      `
    const modal = this.shadow.querySelector('.modal-background')
    this.shadow.addEventListener('click', (event) => {
      if (event.target.closest('.order-button')) {
        event.preventDefault()
        this.shadow.querySelector('.cart').classList.add('active')
      }
      if (event.target.closest('.close')) {
        event.preventDefault()
        this.shadow.querySelector('.cart').classList.remove('active')
      }
      if (event.target.closest('.buy-button')) {
        event.preventDefault()
        modal.classList.add('active')
      }
    })
    modal.addEventListener('click', (event) => {
      if (!event.target.closest('.modal') || event.target.closest('.close-modal')) {
        modal.classList.remove('active')
      }
    })
  }

  updateCart (products) {
    this.shadow.querySelector('.product-gallery').innerHTML = ''
    products?.forEach(product => {
      const productContainer = document.createElement('div')
      const name = document.createElement('p')
      const price = document.createElement('p')
      const details = document.createElement('p')
      const quantity = document.createElement('p')
      productContainer.classList.add('product')
      name.classList.add('name')
      name.innerHTML = product.name
      price.classList.add('price')
      price.innerHTML = `${product.price.toFixed(2)}€`
      details.classList.add('details')
      details.innerHTML = `${product.units}u, ${product.measure}${product.measureUnit}`
      quantity.classList.add('quantity')
      quantity.innerHTML = `${product.quantity}x${product.price.toFixed(2)}€`
      productContainer.appendChild(name)
      productContainer.appendChild(price)
      productContainer.appendChild(details)
      productContainer.appendChild(quantity)
      this.shadow.querySelector('.product-gallery').appendChild(productContainer)
    })
  }
}

customElements.define('cart-component', Cart)
