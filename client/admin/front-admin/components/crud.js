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
        .crud {
          width: 95%;
          display: flex;
          justify-content: space-between;
          gap: 1%;
          margin: 0 auto;
          padding-top: 2%;
          flex-wrap: wrap;
          gap: 30px;
        }
        .data-list {
          flex: 1;
          min-width: min(350px, 100%);
        }
  
      </style>
      <div class="crud">
          <div class="data-list">
            <slot name="data-list"></slot>
          </div>
          <div class="user-form">
            <slot name="user-form"></slot>
          </div>
      </div>
      `
  }
}

customElements.define('crud-component', Crud)
