window.customElements.define(
    "employee-card",
    class Add extends HTMLElement {
      constructor() {
        super();
  
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(this.#template());
      }

      #template() {
        const template = document.createElement("template");
        template.innerHTML = 
        `<div class='employee card' data-id=''>
            <h1 class='name'>hej</h1>
            <p class='email'><slot name="email"/></p>
            <p class='phone'>du</p>
            <p class='department_id'>där</p>
            <img src=''>
        </div>
        `;
  
        return template.content.cloneNode(true);
      }
    }
  );
  