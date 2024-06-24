class Crud extends HTMLElement {
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
        
      </style>
      <div class="crud">
          <div class="data-list">
            <slot name="data-list"></slot>
          </div>
          <div class="data-add">
            <slot name="data-add"></slot>
          </div>
      </div>
      `
  }
}

customElements.define('crud-component', Crud)
