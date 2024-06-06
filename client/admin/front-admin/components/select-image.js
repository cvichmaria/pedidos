import isEqual from 'lodash-es/isEqual'
import { addImage, removeImage, setImageGallery } from '../redux/images-slice.js'
import { store } from '../redux/store.js'
class SelectImage extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.name = this.getAttribute('name')
    this.unsubscribe = null
    this.images = []
  }

  connectedCallback() {
    this.render()
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.images.showedImages.length > 0 && !isEqual(this.images, currentState.images.showedImages)) {
        this.images = currentState.images.showedImages;
        this.showThumbnails(this.images)
      }
      if (currentState.images.showedImages === 0) {
        this.removeThumbnail()
      }
    })
  }

  render() {
    this.shadow.innerHTML =
      /* html */`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">

      <style>
        @import url('../css/generic-shadow.css');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .add-image {
          --size: 8rem;
          width: var(--size);
          height: var(--size);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          margin: 5px;
          color: rgb(0,0,0,0.2);
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 4rem;
          border: 3px solid var(--color-interface);
          transition: transform 0.3s;
          &:hover {
            transform: scale(1.05);
          }
        }
        .add-image:has(.thumbnail) .add-button {
          /*opacity: 0;*/
        }
        .add-button {
          background: none;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(0, 0, 0, 0.2);
          font-size: 4rem;
        }
        .thumbnail {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        .image-icon {
          width: 100%;
          height: 100%;
          & * {
            fill: rgb(0,0,0,0.3)
          }
        }
        .add-image:hover .delete-button {
          display: flex;
        }
        .delete-button {
          z-index: 1;
          position: absolute;
          top: 0;
          right: 0;
          display: none;
          border: none;
          border-radius: 0 0 0 0.5rem;
          cursor: pointer;
          padding: 4px;
          color: var(--color-danger);
          background: var(--color-light);
        }
      </style>
      <div class="add-image">
        <button class="add-button">+</button>
      </div>
      `
    this.shadow.addEventListener('click', (event) => {
      if (event.target.closest('.add-button')) {
        event.preventDefault()
        const image = {
          name: this.getAttribute('name')
        }
        store.dispatch(setImageGallery(image))
        document.dispatchEvent(new CustomEvent('showImageModal'))
      }
    })
  }

  removeThumbnail() {
    const button = this.shadow.querySelector('.add-image')
    const thumbnails = button.querySelectorAll('.thumbnail')
    thumbnails.forEach(thumbnail => {
      thumbnail.remove()
    })
  }

  showThumbnails(images) {
    images.forEach(image => {
      store.dispatch(addImage({
        ...image,
        imageConfiguration: JSON.parse(this.getAttribute('image-configuration'))
      }))
      if (image.name === this.name) {
        const button = this.shadow.querySelector('.add-image')
        const thumbnail = document.createElement('div')
        const newImage = document.createElement('img')
        const deleteButton = document.createElement('p')
        thumbnail.classList.add('thumbnail')
        newImage.alt = image.alt
        newImage.title = image.title
        newImage.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${image.filename}`
        newImage.classList.add('thumbnail-image')
        deleteButton.innerHTML = 'delete'
        deleteButton.classList.add('delete-button', 'material-icons')
        deleteButton.addEventListener('click', (event) => {
          store.dispatch(removeImage(image))
          thumbnail.remove()
        })
        thumbnail.appendChild(newImage)
        thumbnail.appendChild(deleteButton)
        button.appendChild(thumbnail)
      }
    })
  }
}

customElements.define('select-image', SelectImage)
