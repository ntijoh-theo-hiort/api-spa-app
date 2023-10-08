class CreateForm extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template());
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = 
    `
      <h1 class='name'><slot name="name"/>awd</h1>
      <p class='department_id'><slot name="department" />erg</p>
      <p class='email'><slot name="email"/>zdv</p>
      <p class='phone'><slot name="phone"/>awdawd</p>
    `;
    // <img src=''>

    return template.content.cloneNode(true);
  }

  #deleteEmployee(e) {
    e.target.parentElement.style.display = "none";
  }

  #editEmployee() {
    console.log("editing employee");
  }
}

window.customElements.define("employee-card", CreateForm);
