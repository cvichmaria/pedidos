(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();class a extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadow.innerHTML=` 
    <style>
  .clients {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;
    gap: 1rem;
    max-height: 40rem;
    overflow-y: scroll;
    padding-right: 1rem;

    &::-webkit-scrollbar {
        width: 9px;
    }

    &::-webkit-scrollbar-track {
        background: #000000;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #1a1a1a;
        border-radius: 5px;
        border: 3px none #000000;
    }
}

.client {
    display: flex;
    flex-direction: column;
    background-color: #718BE0;
}

.client__buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background-color: #6DB7F3;
}

.client__button {
    color: white;
    background-color: #6DB7F3;
    border: none;
    box-shadow: none;
    padding-top: 5px;
    border-radius: 5px;
}

.client__button:hover {
    color: white;
    background-color: #2a4cbb8c;
}

.client__button:active {
    background-color: #2A4CBB;
}

.client__icon {
    font-size: 20px;
}

.client__info {
    color: white;
    font-weight: 500;
    margin: 5px;
}

.paginator {
    margin-top: 1rem;
}

    </style>
  
    <section>
        <app-menu class="menu"></app-menu>
        <section class="clients">
            <article class="client" *ngFor="let client of clientsData">
                <div class="client__buttons">
                    <button class="client__button" (click)="selectUser(client)">
                        <i class="material-icons client__icon">edit</i>
                    </button>
                    <button class="client__button" (click)="deleteUser(client)">
                        <i class="material-icons client__icon">delete</i>
                    </button>
                </div>
                <div class="client__info">
                    <div class="client__email">Email:</div>
                    <div class="client__name">Nombre:</div>
                    <div class="client__lastName">Apellidos:</div>
                </div>
            </article>
        </section>
        
        <div class="paginator">
            <select class="page-size" (change)="onPageSizeChange($event.target.value)">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <button class="page-button" (click)="onPageChange('first')">First</button>
            <button class="page-button" (click)="onPageChange('prev')">Prev</button>
            <button class="page-button" (click)="onPageChange('next')">Next</button>
            <button class="page-button" (click)="onPageChange('last')">Last</button>
        </div>
        

    </section>

    `}}customElements.define("clients-component",a);class r extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadow.innerHTML=` 
    <style>
  .form__buttons {
    display: flex;
    background-color: #718BE0;
    align-items: center;
    flex: 1;
}

.form__principal {
    color: white;
    font-weight: 500;
    margin-left: 10px;
    margin-right: 10px;
}


.form__image {
    display: flex;
    padding-left: 10px;
    flex: 1;
    background-color: white;
    font-weight: 500;
    color: rgb(131, 121, 121);
    align-items: center;
    justify-content: space-between,
}

.image__buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.image__button {
    color: #6DB7F3;
    border: none;
    box-shadow: none;
    padding-top: 5px;
    border-radius: 5px;
}

.image__button:hover {
    color: white;
    background-color: #2a4cbb8c;

}

.image__button:active {
    background-color: #2A4CBB;
}

.form__fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.form__field {
    display: flex;
    flex-direction: column;
    flex: 1 1 45%;
    margin-left: 1rem;
    max-width: 45%;
}

.field__label {
    color: white;
    font-weight: 500;
    margin-top: 1rem;

}

.field__input {
    height: 20px;
    margin-top: 1rem;
    background-color: #718BE0;
    border: none;
    border-bottom: 1px solid white;
    outline: none;
    color: white;

}

.form__button {
    margin-top: 3rem;
}

.field__input[type="date"] {
    height: 22px;
    border-bottom: 1px solid white;
    color: white;
    width: calc(100%);
}

.datepicker-container {
    display: flex;
    align-items: center;
}

    </style>
  
    <section>
        <form [formGroup]="userInfoForm" (ngSubmit)="onSubmit()" class="form__fields">

        <div class="form__buttons">
            <div class="form__principal">Principal</div>
            <div class="form__image">Imágenes
                <div class="image__buttons">
    
                    <button class="image__button" type="submit">
                        Save
                    </button>
                    <button class="image__button" type="button" (click)="clearData()">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    
        <div class="form__content">
            <div [formGroup]="userInfoForm" class="form__fields">
                <div class="form__field">
                    <label class="field__label" for="name">Nombre</label>
                    <input class="field__input" type="text" id="name" formControlName="name">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="lastnames">Apellidos</label>
                    <input class="field__input" type="text" id="lastName" formControlName="lastName">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="email">Email</label>
                    <input class="field__input" type="email" id="email" formControlName="email">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="phone">Teléfono</label>
                    <input class="field__input" type="tel" id="phone" formControlName="phone">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="mobile">Móvil</label>
                    <input class="field__input" type="tel" id="mobile" formControlName="mobile">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="address">Dirección</label>
                    <input class="field__input" type="text" id="address" formControlName="address">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="province">Provincia</label>
                    <input class="field__input" type="text" id="province" formControlName="province">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="city">Ciudad</label>
                    <input class="field__input" type="text" id="city" formControlName="city">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="postalCode">Código Postal</label>
                    <input class="field__input" type="text" id="postalCode" formControlName="postalCode">
                </div>
    
                <div class="form__field">
                    <label class="field__label" for="startDate">Fecha de Inicio del Servicio</label>
                    <div class="datepicker-container">
                        <input class="field__input" type="date" id="startDate" name="startDate" formControlName="startDate">
                    </div>
                </div>
    
            </div>
        </div>
    </form>

    </section>

    `}}customElements.define("form-component",r);class c extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadow.innerHTML=` 
    <style>
        
        .toolbar {
            background-color: #2A4CBB;
            color: white;
            display: flex;
            justify-content: space-between;
            height: 5rem;
            font-size: 30px;
        }

        .toolbar__button{
            font-size: 25px;
        }

    </style>

    <section>
        <div class="header">
        <div class="toolbar">
            <span>Usuarios</span>
        </div>
    </div>
    </div>
    </section>

    `}}customElements.define("header-component",c);class d extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadow.innerHTML=` 
    <style>
        .main {
    height: 100vh;
    background-color: #2A4CBB;
    padding-left: 3rem;
    padding-right: 3rem;
}

.body {
    display: flex;
}

clients-component {
    width: 30%;
}

.form {
    flex: 1;
    margin-left: 3rem;
}

    </style>
  
    <section>

        <main class="main">
    <header-component></header-component>
    <div class="body">
        <clients-component></clients-component>
        <section class="form">
            <form-component></form-component>
        </section>
    </div>
</main>
    </section>

    `}}customElements.define("main-component",d);class m extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadow.innerHTML=` 
    <style>
        
.menu__button {
    background-color: white;
    display: flex;
    justify-self: center;
    width: 100%;
}

.menu__icon {
    color: #6DB7F3;
}

    </style>
  
    <section>
        <div class="menu">
        <!-- añadir filtro -->
</div>

    </section>

    `}}customElements.define("menu-component",m);
