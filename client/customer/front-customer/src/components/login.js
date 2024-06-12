class Login extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML =
      /* html */`
      <style>
        .login {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        
        .login-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        
        .login-title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
          color: #333;
        }
        
        .login-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        
        .login-button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
          background-color: #007BFF;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        
        .login-button:hover {
          background-color: #0056b3;
        }
        
        .login-message {
          margin-top: 10px;
          text-align: center;
          color: #666;
        }
      </style>
      <div class="login">
        <div class="login-container">
          <div class="login-title">Login</div>
          <form>
            <input type="email" name="email" class="login-input" placeholder="Enter your email">
            <input type="password" name="password" class="login-input" placeholder="Enter your password">
            <button class="login-button">Login</button>
          </form>
          <div class="login-message">Please enter your credentials to log in.</div>
        </div>
      </div>
      `

    const form = this.shadow.querySelector('form')

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.submitForm(form)
    })
  }
  
  async submitForm(form) {
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

customElements.define('login-component', Login);
