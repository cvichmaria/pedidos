class Order extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.customerId = 1
  }

  connectedCallback () {
    this.loadData().then(() => this.render())
  }

  async loadData() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    this.orders = await response.json()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          margin: 0;
          padding: 0;
      }
  
      .orders {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin: 20px;
      }
  
      .order-gallery {
          flex: 1 1 100%;
          min-height: 300px;
          background-color: #e0e0e0;
      }
  
      .details-background {
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
  
      .details {
          background-color: #fff;
          padding: 20px;
          width: 80%;
          max-width: 600px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
      }
  
      .details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          margin-bottom: 10px;
      }
  
      .details-header h5 {
          margin: 0;
          font-size: 1.2rem;
      }
  
      .close {
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
      }
  
      .close:hover {
          color: red;
      }
  
      .product-gallery {
          min-height: 200px;
          background-color: #f5f5f5;
          margin-bottom: 10px;
      }
  
      .details-total {
          font-size: 1.2rem;
          margin-bottom: 10px;
      }
  
      .details-total-price {
          font-weight: bold;
          color: #333;
      }
  
      .refound-button {
          background-color: #ff9800;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 1rem;
      }
  
      .refound-button:hover {
          background-color: #f57c00;
      }
  </style>
  
  <div class="orders">
      <div class="order-gallery"></div>
  </div>
  <div class="details-background">
      <div class="details">
          <header class="details-header">
              <h5>Detalles</h5>
              <button class="close">X</button>
          </header>
          <div class="product-gallery"></div>
          <div class="details-total">Total: <span class="details-total-price"></span>€</div>
          <button class="refound-button">Devolver pedido</button>
      </div>
  </div>
      `
    this.LoadOrders()
    const details = this.shadow.querySelector('.details')
    this.shadow.addEventListener('click', async (event) => {
      if (event.target.closest('.open-filters')) {
        const filters = event.target.closest('.filters')
        if(filters.classList.contains('opened')) {
          const reference = this.shadow.querySelector('[name="reference"]').value.trim() == '' ? null : this.shadow.querySelector('[name="reference"]').value
          const saleDate = this.shadow.querySelector('[name="saleDate"]').value.trim() == '' ? null : this.shadow.querySelector('[name="saleDate"]').value
          // console.log(reference, saleDate)
          const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}?reference=${reference}&saleDate=${saleDate}`)
          this.orders = await response.json()
          console.log(this.orders)
          this.LoadOrders()
        }
        filters.classList.toggle('opened')
      }
      if (event.target.closest('.details-button')) {
        this.LoadSaledetails(event.target.closest('.details-button').dataset.saleId)
        details.classList.add('active')
      }
      if (event.target.closest('.close') || (event.target.closest('.details-background') && !event.target.closest('.details'))) {
        details.classList.remove('active')
      }
    })
  }
  LoadOrders() {
    this.shadow.querySelector('.order-gallery').innerHTML = ""
    this.orders.forEach(order => {
      const orderContainer = document.createElement('div')
      const reference = document.createElement('p')
      const total = document.createElement('p')
      const dateTime = document.createElement('p')
      const button = document.createElement('button')
      orderContainer.classList.add('order')
      reference.classList.add('reference')
      reference.innerHTML = order.reference
      total.classList.add('total')
      total.innerHTML = `${order.totalBasePrice}€`
      dateTime.classList.add('dateTime')
      dateTime.innerHTML = `${order.saleDate} ${order.saleTime}`
      button.classList.add('details-button')
      button.dataset.saleId = order.id
      button.innerHTML = 'Ver pedido'
      orderContainer.appendChild(reference)
      orderContainer.appendChild(total)
      orderContainer.appendChild(dateTime)
      orderContainer.appendChild(button)
      this.shadow.querySelector('.order-gallery').appendChild(orderContainer)
    })
  }
  async LoadSaledetails(saleId) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/details/${saleId}`)
    const saleDetails = await response.json()
    const productGallery = this.shadow.querySelector('.product-gallery')
    let totalPrice = 0
    productGallery.innerHTML = ""
    saleDetails.forEach(saleDetail => {
      const productContainer = document.createElement('div')
      const productName = document.createElement('p')
      const productSale = document.createElement('p')
      productContainer.classList.add('product')
      productName.classList.add('product-name')
      productName.innerHTML = saleDetail.productName
      productSale.classList.add('product-sale')
      productSale.innerHTML = `${saleDetail.quantity} x ${saleDetail.basePrice}€`
      totalPrice += saleDetail.quantity * saleDetail.basePrice
      productContainer.appendChild(productName)
      productContainer.appendChild(productSale)
      productGallery.appendChild(productContainer)
    })
    this.shadow.querySelector('.details-total-price').innerHTML = totalPrice.toFixed(2)
    this.shadow.querySelector('.refound-button').dataset.saleId = saleId

  }
}

customElements.define('order-component', Order)