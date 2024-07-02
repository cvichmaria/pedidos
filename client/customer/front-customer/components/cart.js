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
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .order-button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin: 20px;
            }
            .cart-container {
                position: fixed;
                top: 0;
                right: 0;
                width: 300px;
                height: 100%;
                background-color: white;
                box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
                transform: translateX(100%);
                transition: transform 0.3s ease-in-out;
            }
            .cart {
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 20px;
            }
            .cart-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .cart-header h3 {
                margin: 0;
            }
            .close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
            }
            .product-gallery {
                flex-grow: 1;
                margin: 20px 0;
            }
            .total {
                font-size: 18px;
                font-weight: bold;
            }
            .buy-button {
                padding: 10px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            .modal-background {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
            }
            .modal {
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                margin: 0;
            }
            .close-modal {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
            }
            .modal-main {
                margin-top: 20px;
            }
            .modal-title {
                font-size: 18px;
                margin: 0;
            }
            .home-button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            .show-cart {
                transform: translateX(0);
            }
            .show-modal {
                opacity: 1;
                visibility: visible;
            }
        </style>
        <button class="order-button">Ver pedido</button>
        <div class="cart-container">
            <div class="cart">
                <header class="cart-header">
                    <h3>Pedido</h3>
                    <button class="close">X</button>
                </header>
                <div class="product-gallery"></div>
                <p class="total">Total: <span class="total-price"></span>€</p>
                <button class="buy-button">Confirmar</button>
            </div>
        </div>
        <div class="modal-background">
            <div class="modal">
                <header class="modal-header">
                    <h3>Pedido realizado correctamente</h3>
                    <button class="close-modal">x</button>
                </header>
                <main class="modal-main">
                    <h5 class="modal-title">Disfruta de tu compra</h5>
                    <p>Pedido realizado</p>
                    <p>Referencia: <span class="order-reference"></span></p>
                    <a href="/cliente" class="home-button">Volver</a>
                </main>
            </div>
        </div>
      `
    const modal = this.shadow.querySelector('.modal-background')
    this.shadow.addEventListener('click', async (event) => {
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken')
          },
          body: JSON.stringify({
            products: this.products
          })
        })
        const data = await response.json()
        console.log(data)
        this.shadow.querySelector('.order-reference').innerHTML = data.reference
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
    let totalPrice = 0
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
      let productPrice = product.price != null ? product.price.basePrice : 0;
      totalPrice += product.quantity * productPrice
      price.innerHTML = `${productPrice}€`
      details.classList.add('details')
      details.innerHTML = `${product.units}u, ${product.measurement}${product.measurementUnit}`
      quantity.innerHTML = `${product.quantity}x${productPrice}€`
      quantity.classList.add('quantity')
      productContainer.appendChild(name)
      productContainer.appendChild(price)
      productContainer.appendChild(details)
      productContainer.appendChild(quantity)
      this.shadow.querySelector('.product-gallery').appendChild(productContainer)
    })
    this.shadow.querySelector('.total-price').innerHTML = totalPrice.toFixed(2)
  }
}

customElements.define('cart-component', Cart)