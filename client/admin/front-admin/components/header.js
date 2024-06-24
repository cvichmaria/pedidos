class Header extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        
      </style>
      <header>
          <title-component title="${this.title}"></title-component>
          <menu-component></menu-component>
      </header>
      `
  }
}

customElements.define('header-component', Header)
