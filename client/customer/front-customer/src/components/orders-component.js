class Orders extends HTMLElement {
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
          title: '0000000000001',
          date: '2021-10-10',
          time: '10:00',
          price: 330
        },
        {
          id: 2,
          title: '0000000000002',
          date: '2021-10-10',
          time: '10:00',
          price: 330
        },
        {
          id: 3,
          title: '0000000000003',
          date: '2021-10-10',
          time: '10:00',
          price: 330
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
  
            .buys{
              display: flex;
              flex-direction: column;
              gap: 1rem;
              height: 80%;
              max-height: 80%;
              overflow-y: scroll;
              width: 100%;
            }
  
            .buys::-webkit-scrollbar{
              width: 0;
            }
  
            .buys::-webkit-scrollbar-thumb{
              background-color: hsla(0, 0%, 100%, 0.2);
              border-radius: 1rem;
            }
  
            .buy{
              align-items: center;
              border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);  
              display: grid;
              gap: 1rem;
              grid-template-columns: repeat(2, 1fr);
              padding-bottom: 1rem;
              width: 100%;
            }
  
            .buy-title h3, .buy-specifications span, .buy-total-price span, .buy-quantity span{
              color: hsla(0, 0%, 100%);
              font-weight: 700;
            }
  
            .buy-total-price, .buy-quantity{
              align-items: center;
              display: flex;
              justify-content: flex-end;
            }
  
            .see-order{
              display: flex;
              justify-content:flex-end;
              align-items: center;
              width: 100%;
            }
            
            .see-order span{
              background-color: hsl(0, 0%, 100%);
              border: none;
              border-radius: 10px;
              font-family: "Roboto", sans-serif;
              font-weight: 700;
              outline: none;
              padding: 0.5rem;
            }
  
            form {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              width: 100%;
              margin-bottom: 1rem;
              border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
              padding-bottom: 1.5rem;
            }
  
            .form-group {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 3rem;
            }
  
            .form-element {
              width: 100%;
            }
  
            input {
              width: 100%;
              padding: 0.5rem;
              border-radius: 0.25rem;
              border: 1px solid #ccc;
            }
  
            .form-button{
              display: flex;
              justify-content: flex-end;
              width: 100%;
            }
  
            .form-button span{
              background-color: hsl(0, 0%, 100%);
              border: none;
              border-radius: 10px;
              font-family: "Roboto", sans-serif;
              font-size: 0.8rem;
              font-weight: 700;
              outline: none;
              padding: 0.5rem;
              text-align: center;
              width: 100%;
            }
          </style>
  
          <section class="all-orders">
            <form>
              <div class="form-group">
                <div class="form-element">
                  <input type="text" placeholder="Referencia del pedido">
                </div>
                <div class="form-button">
                  <span>Buscar por referencia</span>
                </div>
              </div>
              <div class="form-group">
                <div class="form-element">
                  <input type="date" placeholder="dd/mm/aaaa">
                </div>
                <div class="form-button">
                  <span>Buscar por fecha</span>
                </div>
              </div>
            </form>
          
            <div class="buys">
            
            </div>
          </section>
      `
  
      const buys = this.shadowRoot.querySelector('.buys')
  
      this.data.forEach(buy => {
        const buyContainer = document.createElement('div')
        buyContainer.classList.add('buy')
        buys.appendChild(buyContainer)
  
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('buy-title')
        buyContainer.appendChild(titleContainer)
  
        const title = document.createElement('h3')
        title.textContent = buy.title
        titleContainer.appendChild(title)
  
        const totalPriceContainer = document.createElement('div')
        totalPriceContainer.classList.add('buy-total-price')
        buyContainer.appendChild(totalPriceContainer)
  
        const price = document.createElement('span')
        price.textContent = `${buy.price}€`
        totalPriceContainer.appendChild(price)
  
        const specificationsContainer = document.createElement('div')
        specificationsContainer.classList.add('buy-specifications')
        buyContainer.appendChild(specificationsContainer)
  
        const specifications = document.createElement('span')
        specifications.textContent = `${buy.date} ${buy.time}`
        specificationsContainer.appendChild(specifications)
  
        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('see-order')
        buyContainer.appendChild(buttonContainer)
  
        const sawOrderButton = document.createElement('span')
        sawOrderButton.textContent = 'Ver pedido'
        buttonContainer.appendChild(sawOrderButton)
      })
    }
  }
  
  customElements.define('orders-component', Orders)