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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
  
      .reset {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5;
      }
  
      .reset-box {
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
  
      .reset-form {
          display: flex;
          flex-direction: column;
          align-items: center;
      }
  
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
  
      .confirm-button {
          background-color: #007bff;
          color: #ffffff;
          border: none;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s ease;
      }
  
      .confirm-button:hover {
          background-color: #0056b3;
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
