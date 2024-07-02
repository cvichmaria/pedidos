class Notification extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    document.addEventListener('showNotification', event => {
      this.showNotification()
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      </style>
      <div class="notification">
        <h3>Guardado</h3>
      </div>
      `
  }

  showNotification () {
    const notification = this.shadow.querySelector('.notification')
    notification.classList.add('active')
    setTimeout(() => {
      const notification = this.shadow.querySelector('.notification')
      notification.classList.remove('active')
    }, 5000)
  }
}

customElements.define('notification-component', Notification)
