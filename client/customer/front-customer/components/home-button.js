class HomeButton extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
  
      .home-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 3%;
          background-color: white;
          height: 50px;
      }
  
      .home-icon {
          font-family: 'Material Symbols Outlined';
          font-size: 3rem;
          color: var(--white);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
      }
  
      .home-icon:hover {
          transform: scale(1.1);
      }
  </style>
  
  <a href="../cliente" class="home-button">
      <span class="home-icon">home</span>
  </a>
  <title-component title="${this.title}"></title-component>
  <slot name="button"></slot>
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
customElements.define('home-button-component', HomeButton)
