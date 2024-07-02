class Menu extends HTMLElement {
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
            body {
                font-family: Arial, sans-serif;
            }

            .burger-button {
                display: inline-block;
                cursor: pointer;
                padding: 10px;
                border: none;
                background: none;
                outline: none;
            }

            .burger-button div {
                width: 30px;
                height: 3px;
                background-color: #333;
                margin: 5px 0;
                transition: 0.4s;
            }

            .menu {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 50px;
                right: 10px;
                background-color: white;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                overflow: hidden;
            }

            .menu a {
                padding: 15px;
                text-decoration: none;
                color: #333;
                border-bottom: 1px solid #ddd;
            }

            .menu a:last-child {
                border-bottom: none;
            }

            .show {
                display: flex;
            }
        </style>

        <button class="burger-button">
            <div></div>
            <div></div>
            <div></div>
        </button>
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
customElements.define('menu-component', Menu)
