class Order extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.customerId = 1
    this.orders = [];
  }

  connectedCallback() {
    this.loadData().then(() => this.render())
  }

  async loadData() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    this.orders = [
      {
        id: 23,
        quantity: 31,
        product_id: 26,
        customer_id: 1,
        PaymentMethodId: 1, 
        reference: "REF-001",
        unit_price: 50.00,
        total_price: 45.00,
        discount: 5.00,
        order_date: "2024-07-01",
        order_time: "12:30:00",
        createdAt: "2024-07-02 10:33:46",
        updatedAt: "2024-07-02 10:33:46"
      }
     
    ];
    
  }

  render() {
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

      .modal-background.active {
        opacity: 1;
      }
      .refound-button {
          width: 15rem;
          margin: 1rem auto;
          padding: 1rem;
          font: inherit;
          border: none;
          border-radius: 100rem;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          &:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        }
        
  </style>
  
  <div class="orders">
      <div class="order-gallery"></div>
  </div>
      <div class="details">
        
          <div class="product-gallery"></div>
          <div class="details-total">Total: <span class="details-total-price"></span>€</div>
          <button class="refound-button">Devolver pedido</button>
      </div>
     
  </div>
      `
    this.LoadOrders()
    const details = this.shadow.querySelector('.details')
    this.shadow.addEventListener('click', async (event) => {
      if (event.target.closest('.details-button')) {
        this.LoadSaledetails(event.target.closest('.details-button').dataset.saleId)
        details.classList.add('active')
      }
      if (event.target.closest('.close') || (event.target.closest('.details-background') && !event.target.closest('.details'))) {
        details.classList.remove('active')
      }
      if (event.target.closest('.refound-button')) {
        const saleId = 22
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/returns/${saleId}`, {
          method: 'post'
        })
        const data = await response.json()
        this.shadow.querySelector('.modal-background').classList.add('active')
        this.shadow.querySelector('.order-reference').innerHTML = data.reference
      }
      if (event.target.closest('.close-modal') || (event.target.closest('.modal-background') && !event.target.closest('.modal'))) {
        this.shadow.querySelector('.modal-background').classList.remove('active')
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