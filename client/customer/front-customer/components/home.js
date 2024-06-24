class Home extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.links = [
      {
        name: 'Nuevo pedido',
        url: './cliente/productos'
      },
      {
        name: 'Ver pedidos',
        url: './cliente/pedidos'
      }
    ]
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        
      </style>
      <div class="home-menu">
      </div>
      `
    this.links.forEach(link => {
      console.log(link)
      const linkElement = document.createElement('a')
      linkElement.innerHTML = link.name
      linkElement.href = link.url
      linkElement.classList.add('menu-item')
      this.shadow.querySelector('.home-menu').appendChild(linkElement)
    })
  }
}

customElements.define('home-component', Home)
