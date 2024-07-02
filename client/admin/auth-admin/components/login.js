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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
  
      .login {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5;
      }
  
      .login-box {
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 2rem;
          width: 300px;
          text-align: center;
      }
  
      header h2 {
          font-size: 1.5rem;
          color: #333333;
          margin-bottom: 1.5rem;
      }
  
      .login-form {
          display: flex;
          flex-direction: column;
          align-items: center;
      }
  
      input[type="email"],
      input[type="password"] {
          width: 100%;
          padding: 0.8rem;
          margin-bottom: 1rem;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 1rem;
      }
  
      .buttons {
          margin-top: 1rem;
      }
  
      .login-button {
          background-color: #007bff;
          color: #ffffff;
          border: none;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s ease;
          margin-right: 0.5rem;
      }
  
      .login-button:hover {
          background-color: #0056b3;
      }
  
      .forgot {
          color: #007bff;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
      }
  
      .forgot:hover {
          color: #0056b3;
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
