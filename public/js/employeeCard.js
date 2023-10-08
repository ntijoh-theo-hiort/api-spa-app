console.log('employee card running...')
    export class EmployeeCard extends HTMLElement {
      constructor(employeeData) {
        super();
        this.toggle = false;
        this.employeeData = employeeData
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(this.#infoTemplate());
      }
      
      connectedCallback(){
        const editButton = this.shadowRoot.querySelector("#edit")
        editButton.addEventListener('click', () => {this.#toggleState()})

        
        const submitButton = this.shadowRoot.querySelector("#submit")
        submitButton.addEventListener('submit', (e) =>{
          e.preventDefault()
          const data = new FormData(e)
          // IMPLEMENT FUNCTION TO UPDATE EMPLOYEE INFO IN DATABASE
          // ALSO UPDATE THIS.EMPLOYEEDATA WITH FORMDATA
          this.#toggleState()
        })
      }

      #toggleState(){
        this.toggle = !this.toggle
        this.#renderTemplate()
      }

      #renderTemplate(){
        const toggle = this.toggle
        console.log(toggle)
        console.log(this.shadowRoot)
        this.shadowRoot.innerHTML = ''
        switch(toggle){
          case false:
            this.shadowRoot.appendChild(this.#infoTemplate())
          case true:
            this.shadowRoot.appendChild(this.#editTemplate())
        }
      }

      #infoTemplate() {
        const template = document.createElement("template");
        const employeeData = this.employeeData

        template.innerHTML = 
        `
          <li class="employee-card">
            <h1 class='name'>${employeeData.name}</h1>
            <p class='department_id'>${employeeData.department_id}</p>
            <p class='email'>${employeeData.email}</p>
            <p class='phone'>${employeeData.phone}</p>
            <button id="edit">edit</button>
          </li>
          `;
          // <img src=''>
        
        return template.content.cloneNode(true);
      }

      #editTemplate() {
        const template = document.createElement("template");
        const employeeData = this.employeeData


        template.innerHTML = 
        `
          <li class="employee-card">
            <form>
              <input class='name' value="${employeeData.name}"/>
              <input class='department_id' value="${employeeData.department_id}"/>
              <input class='email' value="${employeeData.email}"/>
              <input class='phone' value="${employeeData.phone}"/>
              <input type="submit"/>
            </form>
          </li>
          `;
          // <img src=''>
        
        return template.content.cloneNode(true);
      }

      #deleteEmployee(e){
        e.target.parentElement.style.display = "none"
      }

      #editEmployee(){
        console.log('editing employee')
      }
    }

    window.customElements.define(
      "employee-card", EmployeeCard
    );
