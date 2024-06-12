class Reset extends HTMLElement {
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
      <div class="reset">
        <div class="reset-container">
          <div class="reset-title">Reset Password</div>
          <input type="email" class="reset-input" placeholder="Enter your email">
          <button class="reset-button">Send Reset Link</button>
          <div class="reset-message">Please enter your email to receive a reset link.</div>
        </div>
      </div>
      `;
  }
}

customElements.define('reset-component', Reset);
