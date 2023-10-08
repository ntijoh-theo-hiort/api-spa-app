console.log('employee app running...')
window.customElements.define(
    "employee-app",
    class EmployeeApp extends HTMLElement {
      constructor() {
        super();
  
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(this.#template());
        this.createForm = this.shadowRoot.querySelector('create-form')
        this.employeeList = this.shadowRoot.querySelector('employee-list')
      }
    //   employeeCreator.addEventListener("submit", createEmployee)

      connectedCallback(){
        this.shadowRoot.addEventListener('newEmployee', this.#newEmployee.bind(this))
      }

      #newEmployee(e){
        e.stopPropagation()
        this.employeeList.setAttribute('new-employee', e.detail.newEmployee)
      }

      #template() {
        const template = document.createElement("template");
        template.innerHTML = 
        `
        <create-form></create-form>
        <employee-list></employee-list>
        `;
  
        return template.content.cloneNode(true);
      }
    }
  );
  