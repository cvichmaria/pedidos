class Header extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback () {
      this.render()
    }
  
    render () {
      this.shadowRoot.innerHTML = /* html */`
          <style>
            *{
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
  
            header{
              width: 100%;
              max-height: 8vh;
              background-color: black;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem 2rem;
            }
          </style>
          <header>
            <slot></slot>
          </header>
  
        `
    }
  }
  
  customElements.define('header-component', Header)