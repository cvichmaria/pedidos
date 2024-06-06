class Activation extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    if (!token) {
      window.location.href = '/'
    }
    this.render();
  }

  async render() {
    this.shadow.innerHTML =
      /* html */`
      <style>
        .reset {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        
        .reset-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        
        .reset-title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
          color: #333;
        }
        
        .reset-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        
        .reset-button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
          background-color: #007BFF;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        
        .reset-button:hover {
          background-color: #0056b3;
        }
        
        .reset-message {
          margin-top: 10px;
          text-align: center;
          color: #666;
        }
      </style>
        <form class="reset">
        <div class="reset-container">
          <div class="reset-title">New password</div>
          <input type="password" class="reset-input" placeholder="Enter your password">
          <input type="password" class="repeat-input" placeholder="Repeat your password">
          <button type="submit" class="reset-button">Create password</button>
        </div>
        </form>
      `;

      this.shadow.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
      
        const password = this.shadow.querySelector('.reset-input').value;
        const repeatPassword = this.shadow.querySelector('.repeat-input').value;
      
        if (password !== repeatPassword) {
          this.shadow.querySelector('.reset-message').textContent = 'Passwords do not match';
          return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password })
        })
      });
      
    
  }
}



customElements.define('activation-component', Activation);
