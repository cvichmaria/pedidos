class Main extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.alignItems = this.getAttribute('align-items') || 'flex-start'
      this.justifyContent = this.getAttribute('justify-content') || 'flex-start'
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
            
            main{
              width: 100%;
              height: 92vh;
              max-height: 92vh;
              min-height: 92vh;
              background-color: hsla(0, 0%, 100%, 0);
              display: flex;
              flex-direction: column;
              justify-content: ${this.justifyContent};
              align-items: ${this.alignItems};
              padding: 2rem;
            }
          </style>
          <main>
            <slot></slot>
          </main>
        `
    }
  }
  
  customElements.define('main-component', Main)