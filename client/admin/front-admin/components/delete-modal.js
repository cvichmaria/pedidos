class DeleteModal extends HTMLElement {
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
      <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
        <style>
            @import url('../css/generic-shadow.css');

            .warning{
                font-size: 50px;
                line-height: 50px;
                color: var(--color-danger);
            }
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                visibility: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.2);
                z-index: 400;
                backdrop-filter: blur(2px);
            }
            .modal.active {
                visibility: visible;
            }
            .modal-content {
                min-width: 20%;
                overflow: hidden;
                border-radius: 5px;
                transform: scale(0);
                background: white;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 360px;
                transition: transform 0.1s ease-out;
                gap: 20px;
            }
            .modal.active .modal-content {
                transform: scale(1);
            }
            .modal-content h3 {
                margin: 0;
                text-align: center;
            }
            .title, .subtitle{
              text-align: center;
            }
            .subtitle{
                color: var(--color-muted);
            }
            .buttons {
                display: flex;
                justify-content: space-evenly;
                gap: 10px 20px;
                flex-wrap: wrap;
            }
            button {
                min-width: 130px;
                padding: 8px 12px;
                border: 2px solid var(--color-danger);
                border-radius: 5px;
                cursor: pointer;
                background: none;
                font-weight: bold;
                font-size: var(--font-size-base);
            }
            .confirm {
                background-color: var(--color-danger);
                color: var(--color-white);
            }

        </style>
        <div class="delete modal">
            <div class="modal-content">
                <div class="title">
                  <span class="warning material-icons">warning</span>
                  <h3>¿Seguro que quieres borrar?</h3>
                </div>
                <p class="subtitle">Esta acción eliminará toda la información. No es posible deshacerlo.</p>
                <div class="buttons">
                    <button class="confirm">Si, eliminar</button>
                    <button class="close">Cancelar</button>
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

customElements.define('delete-component', DeleteModal)
