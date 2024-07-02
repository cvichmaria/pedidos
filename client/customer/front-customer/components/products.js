import { updateCart } from '../redux/cart-slice.js'
import { store } from '../redux/store.js'

class Products extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.loadData().then(() => this.render())
  }

  async loadData() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    this.products = await response.json()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
      }
    
      .products {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        background-color: #f0f0f0;
        min-height: 100vh;
      }
    
      .product-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        width: 100%;
        max-width: 1200px;
        margin-top: 2rem;
      }
    
      .product {
        background-color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        border-radius: 8px;
        transition: transform 0.3s ease;
      }
    
      .product:hover {
        transform: translateY(-5px);
      }
    
      .name {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #333333;
      }
    
      .price {
        font-size: 1.25rem;
        color: #007bff;
        margin-bottom: 1rem;
      }
    
      .details {
        font-size: 1rem;
        color: #666666;
        margin-bottom: 1rem;
      }
    
      .quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    
      .quantity button {
        background-color: #007bff;
        color: #ffffff;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
    
      .quantity button:hover {
        background-color: #0056b3;
      }
    
      .quantity-number {
        background-color: #f0f0f0;
        color: #333333;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
    
      </style>
      <div class="products">
        <div class="product-gallery"></div>
      </div>
      `
    this.products.forEach(product => {
      const productContainer = document.createElement('div')
      const name = document.createElement('p')
      const price = document.createElement('p')
      const details = document.createElement('p')
      const quantity = document.createElement('div')
      const substract = document.createElement('button')
      const add = document.createElement('button')
      const number = document.createElement('p')
      productContainer.classList.add('product')
      name.classList.add('name')
      name.innerHTML = product.name
      price.classList.add('price')
      price.innerHTML = product.price != null ? `${product.price.basePrice}€` : `0€`;
      details.classList.add('details')
      details.innerHTML = `${product.units}u, ${product.measurement}${product.measurementUnit}`
      quantity.classList.add('quantity')
      substract.classList.add('substract')
      substract.innerHTML = '-'
      add.classList.add('add')
      add.innerHTML = '+'
      number.classList.add('quantity-number')
      number.innerHTML = 0
      productContainer.appendChild(name)
      productContainer.appendChild(price)
      productContainer.appendChild(details)
      quantity.appendChild(substract)
      quantity.appendChild(number)
      quantity.appendChild(add)
      productContainer.appendChild(quantity)
      add.addEventListener('click', (event) => {
        number.innerHTML++
        store.dispatch(updateCart({
          ...product,
          quantity: parseInt(number.innerHTML)
        }))
      })
      substract.addEventListener('click', (event) => {
        if (number.innerHTML > 0) {
          number.innerHTML--
          store.dispatch(updateCart({
            ...product,
            quantity: parseInt(number.innerHTML)
          }))
        }
      })
      this.shadow.querySelector('.product-gallery').appendChild(productContainer)
    })
  }
}

customElements.define('products-component', Products)