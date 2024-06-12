class BackToBuyButton extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.getSVG = this.getAttribute('svg')
    }
  
    connectedCallback () {
      this.render()
    }
  
    render () {
      this.shadowRoot.innerHTML = /* html */`
          <style>
            .back-button{
              width: 2rem;
              height: 2rem;
              fill: white;
              cursor: pointer;
            }
          </style>
  
          <div class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>keyboard-backspace</title><path d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" /></svg>
          </div>
        `
    }
  }
  
  customElements.define('back-to-buy-component', BackToBuyButton)