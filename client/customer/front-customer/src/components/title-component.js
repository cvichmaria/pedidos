class Title extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.title = this.getAttribute('title')
      this.element = this.getAttribute('element')
      this.fontSize = this.getAttribute('font-size')
      this.color = this.getAttribute('color')
    }
  
    connectedCallback () {
      this.render()
    }
  
    render () {
      this.shadowRoot.innerHTML = /* html */`
          <style>
            h1, h2, h3, h4, h5, h6 {
              color: ${this.color};
              font-family: "Roboto", sans-serif;
              font-size: ${this.fontSize};
              font-weight: 700;
              margin: 0;
            }
          </style>
          <div class="title"></div>
        `
  
      const title = document.createElement(this.element)
      title.textContent = this.title
      this.shadowRoot.querySelector('.title').appendChild(title)
    }
  }
  
  customElements.define('title-component', Title)