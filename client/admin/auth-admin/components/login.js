class Login extends HTMLElement {
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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .login {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-box {
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
    
        .login-form {
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
        .login-button {
          padding: 3%;
          color: inherit;
          background-color: var(--primary-color,rgb(0, 56, 168));
          border: none;
          border-radius: 0.5rem;
          font: inherit;
          cursor: pointer;
          box-shadow: var(--sahdow,5px 5px 0px 0px rgba(0, 0, 0, 0.2));
          &:hover {
            filter: brightness(0.9);
          }
        }
      </style>
      <div class="login">
        <div class="login-box">
          <header>
            <h2>Login</h2>
          </header>
          <form class="login-form">
            <input type="email" name="email" placeholder="user">
            <input type="password" name="password" placeholder="password">
            <div class="buttons">
              <a class="forgot" href="./login/reset">No recuerdo mi contraseña</a>
              <button class="login-button">Login</button>
            </div>
          </form>
        </div>
      </div>
      `
    this.shadow.querySelector('.login-form').addEventListener('submit', (event) => {
      event.preventDefault()
      this.submitForm(this.shadow.querySelector('.login-form'))
    })
  }

  async submitForm (form) {
    const endpoint = import.meta.env.VITE_API_URL
    const formData = new FormData(form)
    const formDataJson = Object.fromEntries(formData.entries())

    try {
      const result = await fetch(`${endpoint}/api/auth/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
      })

      if (result.ok) {
        const data = await result.json()
        window.location.href = data.redirection
      } else {
        const error = await result.json()
        console.log(error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

customElements.define('login-component', Login)
