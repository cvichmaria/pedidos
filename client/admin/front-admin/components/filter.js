class Filter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
    document.addEventListener('showFilterModal', event => {
      this.openModal()
    })
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
          <style>
          </style>
          <div class="filter modal">
            <div class="modal-content">
                <h3>Filtro</h3>
                <form>
                    <div class="form-field">
                        <label for="filter-name">Nombre:</label>
                        <input type="text" name="filter-name" id="filter-name">
                    </div>
                    <div class="form-field">
                        <label for="filter-email">Email:</label>
                        <input type="email" name="filter-email" id="filter-email">
                    </div>
                </form>
                <div class="buttons">
                    <button>Aceptar</button>
                    <button class="close">Cancelar</button>
                </div>
            </div>
        </div>
        `
  }

  openModal () {
    const filterModal = this.shadow.querySelector('.filter.modal')
    filterModal.classList.add('active')
    filterModal.querySelector('.close').addEventListener('click', () => {
      filterModal.classList.remove('active')
    })
  };
}
customElements.define('filter-component', Filter)
