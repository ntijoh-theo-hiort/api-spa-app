console.log("employee list running...");
import { EmployeeCard } from "./employeeCard.js";
// console.log(EmployeeCard)
class EmployeeList extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template());
    this.root = this.shadowRoot.querySelector('#root')
  }

  async connectedCallback() {
    const response = await fetch("/api/employees");
    this.employeeList = await response.json();
    console.log(this.employeeList);

    this.employeeList.forEach((employee) => {
      this.renderEmployee(employee);
    });
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = 
    `
    <ul id="root">
    </ul>
    `;

    return template.content.cloneNode(true);
  }

  createEmployee(e) {
    console.log('creating employee...')
    e.preventDefault();
    const form = e.srcElement;

    const employeeData = {
      name: form[0].value,
      email: form[1].value,
      phone: form[2].value,
      department_id: form[3].value,
    };

    renderEmployee(employeeData);
    form.reset();
  }
  
  async renderEmployee(employeeData) {
    // console.log('rendering employee...')

    const employeeVar = new EmployeeCard(employeeData);
    this.root.appendChild(employeeVar);
    // console.log(employeeVar)
  }
}

window.customElements.define("employee-list", EmployeeList);
