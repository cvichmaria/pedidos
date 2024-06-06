class Menu extends HTMLElement {
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
         .burger-button {
  position: relative;
  background: none;
  border: none;
  z-index: 300;
  cursor: pointer;
}

.burger-icon {
  width: 30px; /* Reducido de 40px a 30px */
  height: 30px; /* Reducido de 40px a 30px */
  position: relative;
}

.burger-line {
  width: 80%; /* Reducido para un look más estilizado */
  height: 2px; /* Más delgado para un look refinado */
  background-color: #606060; /* Un gris suave en lugar de blanco */
  position: absolute;
  left: 10%; /* Centrado con el nuevo ancho */
  margin: auto;
  border-radius: 5px; /* Menos pronunciado para sutileza */
  transform-origin: center;
  transition: transform 0.3s ease, top 0.3s ease; /* Suavizado de la animación */
}

.burger-line:nth-child(1) {
  top: 25%;
}

.burger-line:nth-child(2) {
  top: 45%; /* Ajuste para reducir el espacio entre las líneas */
}

.burger-line:nth-child(3) {
  top: 65%;
}

.burger.opened .burger-line:nth-child(1) {
  top: 45%;
  transform: rotate(45deg);
}

.burger.opened .burger-line:nth-child(2) {
  opacity: 0; /* Ocultar la línea del medio en lugar de moverla */
}

.burger.opened .burger-line:nth-child(3) {
  top: 45%;
  transform: rotate(-45deg);
}

.burger.closed .burger-line {
  /* Las animaciones de cierre no son necesarias ya que la transición suavizará el regreso */
}

.burger-menu {
  width: 25%; /* Más estrecho para un aspecto más elegante */
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f0f0f0; /* Un fondo más claro y menos agresivo */
  border: 2px solid #e0e0e0; /* Bordes más sutiles */
  border-right: none;
  border-radius: 20px 0 0 20px; /* Bordes menos pronunciados */
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 200;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1); /* Sombra suave para añadir profundidad */
}

.burger-menu-header {
  height: 60px; /* Reducido para un aspecto más compacto */
  background-color: #eaeaea; /* Más claro para suavizar */
  border-bottom: 2px solid #dcdcdc; /* Más suave */
}

.burger.opened .burger-menu {
  transform: translateX(0);
}

        </style>
        <div class="burger">
          <button class="burger-button">
            <div class="burger-icon">
              <div class="burger-line"></div>
              <div class="burger-line"></div>
              <div class="burger-line"></div>
            </div>
          </button>
          <div class="burger-menu">
            <div class="burger-menu-header"></div>
          </div>
        </div>
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
