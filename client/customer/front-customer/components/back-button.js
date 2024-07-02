class BackButton extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML =
      /* html */`
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
  
      .material-symbols-outlined {
          font-variation-settings:
              'FILL' 0,
              'wght' 400,
              'GRAD' 0,
              'opsz' 48;
      }
  
      .back-icon {
          transition: transform 0.3s ease;
          font-size: 48px;
      }
  
      .back-button:hover .back-icon {
          transform: translateX(-5px);
      }
  </style>
  
  <a href="./productos" class="back-button">
      <span class="material-symbols-outlined back-icon">arrow_back</span>
  </a>
      `
    let firstTime = true
    const burgerButton = this.shadow.querySelector('.burger-button')
    burgerButton?.addEventListener('click', () => {
      if (firstTime) {
        firstTime = false
        burgerButton.parentNode.classList.add('opened')
      } else {
        burgerButton.parentNode.classList.toggle('opened')
        burgerButton.parentNode.classList.toggle('closed')
      }
    })
  }
}
customElements.define('back-button-component', BackButton)
