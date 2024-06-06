import { removeImages, showImages } from '../redux/images-slice.js'
import { store } from '../redux/store.js'
class CrudForm extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    document.addEventListener('showElement', this.handleData.bind(this))
    this.render()
  }


  handleData(event) {
    this.showElement(event.detail.data)
    console.log(event.detail.data, 'event.detail.data');
  }

  render() {
    this.shadow.innerHTML =
      /* html */`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">

      <style>
        @import url('../css/generic-shadow.css');
    label {
        color: var(--color);
        font-weight: bold;
    }
    main {
      
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--color-interface);
    }
    .tabs {
        display: flex;
        gap: 10px;
    }
    .tab {
        width: 100%;
        padding: 5px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transform: translateY(2px);
        transition: all 0.3s;
    }
    .tab.selected {
        border-color: var(--color-primary);
        color: var(--color-primary);
    }
    .tab.selected h3 {
      color: var(--color-primary);
    }
    .tab-content .tab {
        padding: 5px;
    }
    .add-buttons {
        display: flex;
    gap: 10px;
    }
    .tab-content {
      display: none;
    }
    .tab-content.selected {
      display: block;
    }
    .error-message {
      color: orange;
    }
    .main-form{
      padding: 5px;
      border-radius: 5px;
      background: var(--color-white);
      box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 25%);
      margin: 5px;
      margin-top: 13px;
    }
    .form-row {
        display: flex;
        justify-content: space-between;
    }
    
    .form-field {
        flex: 1;
        margin: 5px 0;
        padding: 5px;
        display: flex;
    gap: 5px;
    flex-direction: column;
    }
    .form-field input, .form-field textarea {
        height: 1.5rem;
        margin-top: 5px;
        padding: 5px;
        background-color: var(--color-white);
        resize: none;
        border: 1px solid var(--color-interface);
        border-radius: 5px;
        font: inherit;
        font-size: var(--font-size-sm);
    }
    .invalid {
        border-color:red;
    }
    textarea {
        min-height: 3rem;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        appearance: none;
    }
    input[type="file"] {
        display: none;
    }
</style>
        <main>

          <header>
            <div class="tabs">
              <div class="tab selected" data-field="principal">
                <h3>Principal</h3>
              </div>
              <div class="tab" data-field="images">
                <h3>Imágenes</h3>
              </div>
            </div>
            <div class="add-buttons">
            <button class="clean-button material-icons warning custom-btn">
            restart_alt
            </button>
            <button class="save-button material-icons primary custom-btn">
              save
            </button>
            </div>  
          </header>
          <form class="main-form">
            <input type="hidden" name="id">
            <notification-component></notification-component>
            <div class="error-message"></div>
            <div class="tab-content selected" data-field="principal">
              <div class="form-row">
                <div class="form-field">
                  <label for="user">Name:</label>
                  <input type="text" name="name" data-rule="lettersonly">
                </div>
            </div>
            <header>
              <div class="tabs">
                <div class="tab selected" data-field="es">
                  <h3>ES</h3>
                </div>
                <div class="tab" data-field="en">
                  <h3>EN</h3>
                </div>
              </div>
            </header>
            <div class="tab-content selected" data-field="es">
              <div class="form-row">
                <div class="form-field">
                  <label for="question">Pregunta:</label>
                  <input type="question" name="locales.es.question">
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label for="answer">Respuesta:</label>
                  <textarea type="answer" name="locales.es.answer"></textarea>
                </div>
              </div>
            </div>
            <div class="tab-content" data-field="en">
              <div class="form-row">
                <div class="form-field">
                  <label for="question">Question:</label>
                  <input type="question" name="locales.en.question">
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label for="answer">Answer:</label>
                  <textarea type="answer" name="locales.en.answer"></textarea>
                </div>
              </div>
            </div>
            </div>
            <div class="tab-content" data-field="images">
              <div class="form-row">
                <div class="form-field">
                  <label for="avatar">Images 1:</label>
                  <select-image name="avatar" image-configuration='{
                    "xs": {
                      "widthPx": "60",
                      "heightPx": "60"
                    },
                    "sm": {
                      "widthPx": "60",
                      "heightPx": "60"
                    },
                    "md": {
                      "widthPx": "60",
                      "heightPx": "60"
                    },
                    "lg": {
                      "widthPx": "60",
                      "heightPx": "60"
                    }
                  } '></select-image>
                </div>
              </div>
            </div>
            </div>
          </form>
        </main>
        <image-modal-component></image-modal-component>
      `
    const main = this.shadow.querySelector('main')
    main.addEventListener('click', async (event) => {
      if (event.target.closest('.tab')) {
        const tabClicked = event.target.closest('.tab')
        const oldTab = tabClicked.parentNode.querySelector('.selected')
        oldTab.classList.remove('selected')
        this.shadow.querySelector(`[data-field="${oldTab.dataset.field}"].tab-content.selected`).classList.remove('selected')
        tabClicked.classList.add('selected')
        this.shadow.querySelector(`[data-field="${tabClicked.dataset.field}"].tab-content`).classList.add('selected')
      }
    })

    this.shadow.addEventListener('click', async (event) => {
      if (event.target.closest('.save-button')) {
        document.dispatchEvent(new CustomEvent('showNotification'))
        const form = this.shadow.querySelector('.main-form')
        const formData = new FormData(form)
        const formDataJson = {}
        formDataJson.images = store.getState().images.selectedImages

        console.log(formDataJson, 'formData');

        for (const [key, value] of formData.entries()) {
          if (key.includes('locales')) {
            const [prefix, locales, field] = key.split('.')
            if (!(prefix in formDataJson)) {
              formDataJson[prefix] = {}
            }
            if (!(locales in formDataJson[prefix])) {
              formDataJson[prefix][locales] = {}
            }
            formDataJson[prefix][locales][field] = value ?? null
          } else {
            formDataJson[key] = value ?? null
          }
        }
        const endpoint = formDataJson.id ? `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${formDataJson.id}` : `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`
        const method = formDataJson.id ? 'PUT' : 'POST'
        delete formDataJson.id
        try {
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
          })
          if (response.status === 422 || response.status === 500) {
            throw response
          }
          if (response.status === 200) {
            const data = await response.json()
            document.dispatchEvent(new CustomEvent('message'))
          }
        } catch (response) {
          const errorMessage = this.shadow.querySelector('.error-message')
          errorMessage.innerHTML = ''
          const error = await response.json()
          if (Array.isArray(error.message)) {
            error.message.forEach(error => {
              const errorLine = document.createElement('p')
              errorLine.innerHTML = error.message
              errorMessage.appendChild(errorLine)
              console.log(error.message)
            })
          } else {
            const errorLine = document.createElement('p')
            errorLine.innerHTML = error.message
            errorMessage.appendChild(errorLine)
            console.log(error.message)
          }
        }
       
      }
      if (event.target.closest('.add-image')) {
        event.preventDefault()
        document.dispatchEvent(new CustomEvent('showImageModal'))
      }
      if (event.target.closest('.clean-button')) {
        const form = this.shadow.querySelector('.main-form');
        store.dispatch(removeImages());
        form.reset();
      }
    })
  }


  showElement(element) {
    Object.entries(element).forEach(([key, value]) => {
      if (typeof value === 'object') {
        if (key === 'locales') {
          Object.entries(value).forEach(([key, value]) => {
            const language = key
            Object.entries(value).forEach(([key, value]) => {
              const input = this.shadow.querySelector(`[name="locales.${language}.${key}"]`)
              input.value = value
            })
          })
        } else if (key === 'images') {
          store.dispatch(showImages(value))
        } else {
        }
      } else {
        const input = this.shadow.querySelector(`[name = "${key}"]`)
        if (input) {
          input.value = value
        }
      }
    })
  }
}

customElements.define('data-add-component', CrudForm)
