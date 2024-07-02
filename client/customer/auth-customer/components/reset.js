class Reset extends HTMLElement {
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
    
      input[type="email"] {
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
    
      .reset-button {
        background-color: #007bff;
        color: #ffffff;
        border: none;
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }
    
      .reset-button:hover {
        background-color: #0056b3;
      }
    </style>
    
    <div class="reset">
      <div class="reset-box">
        <header>
    
          <h2>Reset</h2>
        </header>
        <form class="reset-form">
          <input type="email" name="email" placeholder="email">
          <div class="buttons">
            <button class="reset-button">Reset password</button>
          </div>
        </form>
      </div>
    </div>
      `
  }
}

customElements.define('reset-component', Reset)
