import { showImage } from '../redux/images-slice.js'
import { store } from '../redux/store.js'
class ImageModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.images = []
  }

  connectedCallback () {
    this.loadData().then(() => this.render())
    document.addEventListener('showImageModal', event => {
      this.openModal()
    })
  }

 

 
  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`)
    const data = await response.json()
    this.images = data.rows
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">

      <style>
        @import url('../css/generic-shadow.css');
        .modal-container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: none;
          justify-content: center;
          align-items: center;
          background-color: rgb(0,0,0,0.2);
          backdrop-filter: blur(2px);
        }
        .modal-container:has(.active) {
          display: flex;
        }
        .modal {
          max-width: min(95vw, 800px);
          width: 100%;
          overflow: hidden;
          border-radius: 5px;
          background: var(--color-white);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--color-primary);
          color: var(--color-white);
          padding: 10px 20px;
        }
        header h2 {
          color: var(--color-white);
        }
        .close {
          background: none;
          border: none;
          color: var(--color-white, white);
          cursor: pointer;
          font-size: 25px;
          width: 25px;
        }
        main {
          height: 50vh;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
        }
        .gallery {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          overflow-y: auto;
          gap: 10px;
          justify-content: flex-start;
          align-content: flex-start;
        }
        .image-container, .gallery .add-image {
          --size: 8rem;
          width: var(--size);
          height: var(--size);
          display: block;
          overflow: hidden;
          border: 3px solid var(--color-interface);
          border-radius: 0.5rem;
          cursor: pointer;
          margin: 5px;
          transition: transform 0.3s;
          &:hover {
            transform: scale(1.05);
          }
        }
        .gallery .add-image {
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(0,0,0,0.2);
          font-size: 4rem;
        }
        input[type="file"] {
          display: none;
        }
        .image-container {
          position: relative;
          &.selected {
            border-color: var(--color-primary);
          }
        }
        .image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .delete-image {
          position: absolute;
          top: 0;
          right: 0;
          display: none;
          border: none;
          border-radius: 0 0 0 0.5rem;
          cursor: pointer;
          padding: 4px;
          color: var(--color-danger);
        }
        .image-container:hover .delete-image {
          display: block;
        }
        form {
        }
        input,label {
          display: block;
        }
        input {
          border: none;
          border-radius: 0.2rem 0.2rem 0 0;
          font: inherit;
        }
        input:focus {
          outline: none;
        }
        footer {
          display: flex;
          justify-content: flex-end;
          padding: 0 20px 20px;
        }
        .submit-button {
          border-radius: 0.5rem;
          cursor: pointer;
          font: inherit;
          min-width: 130px;
          padding: 8px 12px;
          border: 2px solid var(--color-danger);
          border-radius: 5px;
          cursor: pointer;
          background: none;
          font-weight: bold;
          font-size: var(--font-size-base);
        }
      </style>
      <div class="modal-container">
        <div class="modal">
          <header>
            <h2 class="title">Galería</h2>
            <button class="close material-icons">highlight_off</button>
          </header>
          <main>
            <div class="gallery">
              <label class="add-image" for="image">+</label>
              <input type="file" accept="image/png, image/gif, image/jpeg, image/webp" name="file" id="image">
            </div>
          </main>
          <footer>
            <button class="submit-button primary" disabled>Guardar</button>
          </footer>
        </div>
      </div>
    `
    const modal = this.shadow.querySelector('.modal')
    modal.addEventListener('click', async (event) => {
      if (event.target.closest('.close')) {
        modal.classList.remove('active')
      }
      if (event.target.closest('.delete-image')) {
        const imageContainer = event.target.closest('.delete-image').parentNode
        const endpoint = imageContainer.querySelector('.image').src
        const response = await fetch(endpoint, {
          method: 'DELETE'
        })
        const data = await response.json()
        if (response.status === 200) {
          if (imageContainer.classList.contains('selected')) {
            imageContainer.classList.remove('selected')
          }
          imageContainer.remove()
        } else {
          alert(data.message)
        }
      } else if (event.target.closest('.image-container')) {
        const imageContainer = event.target.closest('.image-container')
        if (imageContainer.classList.contains('selected')) {
          imageContainer.classList.remove('selected')
        } else {
          imageContainer.parentNode.querySelector('.selected')?.classList.remove('selected')
          imageContainer.classList.add('selected')
        }
        this.toggleDisabled()
      }
      if (event.target.closest('.submit-button')) {
        let image = store.getState().images.imageGallery
        const selectedImage = this.shadow.querySelector('.image-container.selected .image')
        const filename = selectedImage.alt;
        image = { ...image, filename }
        store.dispatch(showImage(image))
        modal.classList.remove('active')
      }
    })
    const input = this.shadow.querySelector('#image')
    input.addEventListener('change', (event) => {
      this.uploadImage(event.target.files[0])
    })
    this.images.forEach(file => {
      this.createImage(file.filename)
    })
  }

  openModal () {
    const modal = this.shadow.querySelector('.modal')
    modal.classList.add('active')
  }

  async uploadImage (file) {
    const formData = new FormData()
    formData.append('file', file)
    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`, {
      method: 'POST',
      body: formData
    })
    const filenames = await result.json()
    this.shadow.querySelector('.gallery .selected')?.classList.remove('selected')
    filenames.forEach(file => {
      const container = this.createImage(file)
      container.classList.add('selected')
    })
  }

  createImage (file) {
    const gallery = this.shadow.querySelector('.gallery')
    const container = document.createElement('div')
    const image = document.createElement('img')
    const deleteImage = document.createElement('button')
    container.classList.add('image-container')
    image.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${file}`
    image.title = file
    image.alt = file
    image.classList.add('image')
    deleteImage.innerHTML = 'delete'
    deleteImage.classList.add('delete-image', 'material-icons')
    container.appendChild(deleteImage)
    container.appendChild(image)
    gallery.appendChild(container)
    return container
  }

  toggleDisabled () {
    const button = this.shadow.querySelector('.submit-button')
    this.shadow.querySelector('.gallery .selected') ? button.disabled = false : button.disabled = true
  }
}
customElements.define('image-modal-component', ImageModal)
