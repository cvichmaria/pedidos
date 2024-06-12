class Order extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.data = []
    }
  
    async connectedCallback () {
      await this.loadData()
      await this.render()
    }
  
    async loadData () {
      this.data = [
        {
          id: 1,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        },
        {
          id: 2,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        },
        {
          id: 1,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        },
        {
          id: 2,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        },
        {
          id: 1,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        },
        {
          id: 2,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        },
        {
          id: 1,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        },
        {
          id: 2,
          title: 'Cocacola',
          price: 90,
          unities: 16,
          weight: 330,
          quantity: 2,
          measurementWeight: 'ml'
        }
      ]
    }
  
    render () {
      this.shadowRoot.innerHTML = /* html */`
          <style>
  
            :host{
              height: 100%;
              width: 100%;  
            }
  
            *{
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: "Roboto", sans-serif;
            }
  
            .order{ 
              display: flex;
              flex-direction: column;
              gap: 2rem;
              height: 100%;
              max-height: 100%;
              width: 100%;
            }
  
            .products{
              display: flex;
              flex-direction: column;
              gap: 1rem;
              height: 80%;
              max-height: 80%;
              overflow-y: scroll;
              width: 100%;
            }
  
            .products::-webkit-scrollbar{
              width: 0;
            }
  
            .products::-webkit-scrollbar-thumb{
              background-color: hsla(0, 0%, 100%, 0.2);
              border-radius: 1rem;
            }
  
            .product{
              align-items: center;
              border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);  
              display: grid;
              gap: 1rem;
              grid-template-columns: repeat(2, 1fr);
              padding-bottom: 1rem;
              width: 100%;
            }
  
            .product-title h3, .product-specifications span, .product-total-price span, .product-quantity span{
              color: hsla(0, 0%, 100%);
              font-weight: 700;
            }
  
            .product-total-price, .product-quantity{
              align-items: center;
              display: flex;
              justify-content: flex-end;
            }
  
            .resume{
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
              width: 100%;
            }
  
            .checkout-button{
              display: flex;
              justify-content: center;
              width: 100%;
            }
            
            .checkout-button button{
              background-color: hsl(0, 0%, 100%);
              border: none;
              border-radius: 30px;
              font-family: "Roboto", sans-serif;
              font-weight: 700;
              outline: none;
              padding: 1rem;
              width: 80%;
            }
  
            .tax-message{
              grid-column: 1 / -1;
            }
  
            .total span, .total-price span, .tax-message span{
              color: hsla(0, 0%, 100%, 0.7);
              font-weight: 700;
            }
  
            .total span{
              font-size: 1.5rem;
            }
          </style>
  
          <section class="order">
            <div class="products">
            
            </div>
  
            <div class="resume">
              <div class="total">
                <span>Total</span>
              </div>
              <div class="total-price">
                <span></span>
              </div>
              <div class="tax-message">
                <span>Impuestos no incluidos</span>
              </div>
            </div>
  
            <div class="checkout-button">
              <button>Finalizar pedido</button>
            </div>
          </section>
      `
  
      const products = this.shadowRoot.querySelector('.products')
  
      this.data.forEach(product => {
        const productContainer = document.createElement('div')
        productContainer.classList.add('product')
        products.appendChild(productContainer)
  
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('product-title')
        productContainer.appendChild(titleContainer)
  
        const title = document.createElement('h3')
        title.textContent = product.title
        titleContainer.appendChild(title)
  
        const totalPriceContainer = document.createElement('div')
        totalPriceContainer.classList.add('product-total-price')
        productContainer.appendChild(totalPriceContainer)
  
        const price = document.createElement('span')
        price.textContent = `${product.price}€`
        totalPriceContainer.appendChild(price)
  
        const specificationsContainer = document.createElement('div')
        specificationsContainer.classList.add('product-specifications')
        productContainer.appendChild(specificationsContainer)
  
        const specifications = document.createElement('span')
        specifications.textContent = `${product.unities}u, ${product.weight}${product.measurementWeight}`
        specificationsContainer.appendChild(specifications)
  
        const quantityContainer = document.createElement('div')
        quantityContainer.classList.add('product-quantity')
        productContainer.appendChild(quantityContainer)
  
        const quantity = document.createElement('span')
        quantity.textContent = `${product.quantity} x ${product.price}€`
        quantityContainer.appendChild(quantity)
      })
    }
  }
  
  customElements.define('order-component', Order)