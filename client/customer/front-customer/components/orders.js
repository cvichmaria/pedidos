class Order extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.orders = [
      {
        reference: 10101011010,
        total: 180.00,
        dateTime: new Date('2024-6-10 12:55')
      },
      {
        reference: 10101011011,
        total: 10.00,
        dateTime: new Date('2024-6-11 6:30')
      },
      {
        reference: 10101011012,
        total: 250.00,
        dateTime: new Date('2024-7-20 1:00')
      },
      {
        reference: 10101011013,
        total: 1080.00,
        dateTime: new Date('2020-6-10 00:00')
      }
    ]
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      </style>
      <div class="orders">
        <div class="filters">
          <div class="filter-content">
            <div class="filter-inputs">
              <input type="text" name="reference" class="reference-filter" placeholder="Referencia">
              <input type="date" name="date" class="date-filter">
            </div>
          </div>
          <div class="open-filters">
            <p>Filtrar</p>
            <svg class="arrow-down" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M58.1411 84.3343C54.3948 91.2219 44.6051 91.2219 40.8589 84.3343L8.73419 25.2723C5.1205 18.6285 9.87527 10.5 17.3753 10.5L81.6247 10.5C89.1247 10.5 93.8795 18.6285 90.2658 25.2723L58.1411 84.3343Z" fill="black"/>
            </svg>
          </div>
        </div>
        <div class="order-gallery"></div>
      </div>
      `
    this.orders.forEach(order => {
      const orderContainer = document.createElement('div')
      const reference = document.createElement('p')
      const total = document.createElement('p')
      const dateTime = document.createElement('p')
      const button = document.createElement('a')
      orderContainer.classList.add('order')
      reference.classList.add('reference')
      reference.innerHTML = order.reference
      total.classList.add('total')
      total.innerHTML = `${order.total.toFixed(2)}€`
      dateTime.classList.add('dateTime')
      dateTime.innerHTML = `${String(order.dateTime.getDate()).padStart(2, '0')}/${String(order.dateTime.getMonth() + 1).padStart(2, '0')}/${order.dateTime.getFullYear()} ${String(order.dateTime.getHours()).padStart(2, '0')}:${String(order.dateTime.getMinutes()).padStart(2, '0')}`
      button.classList.add('button')
      button.href = '#'
      button.innerHTML = 'Ver pedido'
      orderContainer.appendChild(reference)
      orderContainer.appendChild(total)
      orderContainer.appendChild(dateTime)
      orderContainer.appendChild(button)
      this.shadow.querySelector('.order-gallery').appendChild(orderContainer)
    })
    this.shadow.querySelector('.open-filters').addEventListener('click', (event) => {
      console.log(event.target.parentNode)
      event.target.closest('.filters').classList.toggle('opened')
    })
  }
}

customElements.define('order-component', Order)
