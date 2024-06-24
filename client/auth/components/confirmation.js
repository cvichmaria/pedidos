class Confirmation extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (!token) {
      window.location.href = '/'
    }

    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .reset {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .reset-box {
          width: 30rem;
          min-height: 20rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: stretch;
          overflow: hidden;
          background-color: var(--secondary-color,rgb(94, 55, 81));
          border-radius: 1rem;
          box-shadow: var(--sahdow,5px 5px 0px 0px rgba(0, 0, 0, 0.2));
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5%;
            background-color: var(--primary-color,rgb(0, 56, 168));
            border-bottom: var(--border,3px solid rgba(0, 0, 0, 0.2));
          }
        }
  
        .reset-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          padding: 1%;
        }
        input {
          width: 95%;
          height: 2rem;
          margin-top: 2%;
          padding: 1% 2%;
          background-color: var(--white,white);
          color: var(--black,black);
          border: none;
          border-bottom: var(--border,3px solid rgba(0, 0, 0, 0.2));
          border-width: 5px;
          border-radius: 5px 5px 0 0;
          resize: none;
        }
        input:focus {
          border-color: var(--green, green);
          outline: none;
        }
        .buttons {
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
          align-items: center;
          padding: 3%;
        }
        .forgot {
          color: inherit;
          font: inherit;
          text-decoration: none;
          &:hover {
            filter: brightness(0.9);
          }
        }
        .confirm-button {
          padding: 3%;
          color: inherit;
          background-color: var(--primary-color,rgb(0, 56, 168));
          border: none;
          border-radius: 0.5rem;
          font: inherit;
          cursor: pointer;
          box-shadow: var(--sahdow, 1px 1px 0px 0px rgba(0, 0, 0, 0.2));
          &:hover {
            filter: brightness(0.9);
          }
        }
      </style>
      <div class="reset">
        <div class="reset-box">
          <header>
   
            <h2>Create password</h2>
          </header>
          <form class="reset-form">
            <input type="password" name="password" placeholder="password">
            <input type="password" name="repeatPassword" placeholder="repeat password">
            <div class="buttons">
              <button class="confirm-button">Confirm</button>
            </div>
          </form>
        </div>
      </div>
      `
    const form = this.shadow.querySelector('.reset-form')
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      const formData = new FormData(form)
      const password = formData.get('password')
      console.log(password)
      const repeatPassword = formData.get('repeatPassword')
      if (password === repeatPassword) {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        console.log(token)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password })
        })
      }
    })
  }
}

customElements.define('confirmation-component', Confirmation)
