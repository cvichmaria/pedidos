class Delete extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = null
  }

  connectedCallback () {
    this.render()
    document.addEventListener('showDeleteModal', event => {
      this.endpoint = event.detail.endpoint
      this.openModal()
    })
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
           
        </style>
        <div class="delete modal">
            <div class="modal-content">
                <h3>¿Seguro que quieres borrar?</h3>
                <div class="buttons">
                    <button class="confirm">Si</button>
                    <button class="close">No</button>
                </div>
            </div>
        </div>
      `
  }

  openModal () {
    const deleteModal = this.shadow.querySelector('.delete.modal')
    deleteModal.classList.add('active')
    deleteModal.addEventListener('click', async (event) => {
      if (event.target.closest('.close')) {
        deleteModal.classList.remove('active')
      }
      if (event.target.closest('.confirm')) {
        const response = await fetch(this.endpoint, {
          method: 'DELETE'
        })
        const data = await response.json()
        document.dispatchEvent(new CustomEvent('reload'))
        deleteModal.classList.remove('active')
      }
    })
  }
}

customElements.define('delete-component', Delete)
