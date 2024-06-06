class CrudTable extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.rows = null
  }

  connectedCallback() {
    document.addEventListener('reload', this.handlerReload.bind(this))
    this.loadData().then(() => this.render())
  }

  async loadData() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    const data = await response.json()
    this.rows = data.rows
  }

  handlerReload() {
    this.loadData(this.currentPage).then(() => this.render())
  }

  render() {
    this.shadow.innerHTML =
      /* html */`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">


        <style>
            @import url('../css/generic-shadow.css');
            button {
                padding: 0;
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                display: flex;
            }

            span {
                color: var(--color-secondary);
                font-weight: bold;
            }
            main {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;
                overflow: hidden;
            }
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0;
                gap: 10px;
                margin: 5px;
            }

            .list-content {
                overflow-y: auto;
                flex: 1;
                display: flex;
                flex-direction: column;
                border-radius: 5px;
                background: var(--color-white);
                box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 25%);
                margin: 5px;
            }
            .data-table {
                overflow: hidden;
                padding: 10px;
            }
            .data-table:nth-child(even) {
                background-color: rgba(0, 0, 0, 0.05);
            }
            .data-table header {
                display: flex;
                justify-content: flex-end;
                float: right;
            }

            footer {
                display: flex;
                justify-content: center;
            }
            .pagination {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
            }
            .pagination button:disabled {
                font-weight: bold;
                filter: brightness(0.5);
            }
            .pagination .current-page {
                border-bottom: 3px solid rgba(0, 0, 0, 0.2);
            }
            filter-component,
            delete-component{
              display: contents;
            }
        </style>
        <main>
            <filter-component></filter-component>
            <div class="list-content">
                <delete-component></delete-component>
            </div>
            
        </main>
      `
    const main = this.shadow.querySelector('main')
    this.rows.forEach(dataRow => {
      const dataList = this.shadow.querySelector('.list-content')
      const dataEntry = document.createElement('div')
      dataEntry.classList.add('data-table')
      const dataHeader = document.createElement('header')
      const editButton = document.createElement('button')
      editButton.classList.add('edit-button', 'material-icons', 'success', 'custom-btn')
      editButton.dataset.id = dataRow.id
      editButton.innerHTML = `edit`
      const deleteButton = document.createElement('button')
      deleteButton.classList.add('delete-button', 'material-icons', 'danger', 'custom-btn')
      deleteButton.dataset.id = dataRow.id
      deleteButton.innerHTML = `delete`
      const tableContent = document.createElement('div')
      tableContent.classList.add('data-table-content')
      Object.entries(dataRow).forEach(([key, value]) => {
        if (key !== 'id') {
          const dataLine = document.createElement('p')
          dataLine.innerHTML = `<span>${key}</span>: ${JSON.stringify(value)}`
          tableContent.appendChild(dataLine)
        }
      })
      // NAME
      const dataLine = document.createElement('p');
      dataLine.innerHTML = `<span>Nombre</span>: ${dataRow['name']}`;
      tableContent.appendChild(dataLine);

      const apellidosLine = document.createElement('p');
      apellidosLine.innerHTML = `<span>Apellidos</span>: ${dataRow['surname']}`;
      tableContent.appendChild(apellidosLine);

      const correoLine = document.createElement('p');
      correoLine.innerHTML = `<span>Correo</span>: ${dataRow['email']}`;
      tableContent.appendChild(correoLine);

      const telefonoLine = document.createElement('p');
      telefonoLine.innerHTML = `<span>Teléfono</span>: ${dataRow['phone']}`;
      tableContent.appendChild(telefonoLine);

      dataEntry.appendChild(dataHeader)
      dataHeader.appendChild(deleteButton)
      dataHeader.appendChild(editButton)
      dataEntry.appendChild(tableContent)
      dataList.appendChild(dataEntry)
    })
    main?.addEventListener('click', async (event) => {
      if (event.target.closest('.delete-button')) {
        const elementId = event.target.closest('.delete-button').dataset.id
        const endpoint = `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint') + '/' + elementId}`
        document.dispatchEvent(new CustomEvent('showDeleteModal', {
          detail: {
            endpoint
          }
        }))
      }
      if (event.target.closest('.filter-button')) {
        document.dispatchEvent(new CustomEvent('showFilterModal'))
      }
      if (event.target.closest('.edit-button')) {
        const elementId = event.target.closest('.edit-button').dataset.id
        const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint') + '/' + elementId}`)
        const data = await response.json();
        document.dispatchEvent(new CustomEvent('showElement', { detail: { data } }))
      }
    })
  }
}
customElements.define('data-list-component', CrudTable)
