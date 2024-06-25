import isEqual from 'lodash-es/isEqual';
import { store } from '../redux/store.js';
class Cart extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.unsubscribe = null;
    this.products = [];
  }

  connectedCallback() {

    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (!isEqual(currentState.cart.cartProducts, this.products)) {
        this.products = currentState.cart.cartProducts
        this.updateCart(this.products)
      }
    })
    this.render()
  }

  render() {
    this.shadow.innerHTML =
      /* html */`
      <style>
        :host {
          display: block; 
        }

        .cart-container {
          position: fixed;
          top: 10px;
          right: 10px;
          width: 300px;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          overflow: hidden;
          display: none;
        }

        .cart.active {
          display: block;
        }

        .modal-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: none;
          justify-content: center;
          align-items: center;
        }

        .modal.active {
          display: flex;
        }

        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          width: 300px;
          text-align: center;
        }

        .order-button,
        .buy-button,
        .close,
        .close-modal {
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 10px;
        }

        .order-button:hover,
        .buy-button:hover,
        .close:hover,
        .close-modal:hover {
          background-color: #0056b3;
        }

        .product-gallery {
          padding: 10px;
          max-height: 200px;
          overflow-y: auto;
        }

        .product {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .product p {
          margin: 5px 0;
        }

        .total {
          text-align: right;
          margin-top: 10px;
        }

        .cart-header,
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .cart-header h3,
        .modal-header h3 {
          margin: 0;
        }

        .close,
        .close-modal {
          background-color: transparent;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }

        .close:hover,
        .close-modal:hover {
          color: #f8f9fa;
        }

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
            <h5 class="modal-title">Gracias por tu pedido</h5>
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

























  updateCart(products) {
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
