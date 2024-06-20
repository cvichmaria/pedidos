class Title extends HTMLElement {
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
        .title {
          display: flex;
          background: var(--color-primary);
          padding: 10px 20px;
        }
        h1 {
          color: var(--color-white);
          margin: 0;
        }
      </style>
      <div class="title">
        <h1>${this.title}</h1>
      </div>
      `
  }
}

customElements.define('title-component', Title)
