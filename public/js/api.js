async function index() {
   const response = await fetch('/api/employees/1')
   if (response.status == 200) {
      const user = await response.json()
      renderUser(user)
   } else {
      console.log("ohnoes")
   }
}

function renderUser(user) {
   document.body.innerHTML += `<h1>${user.name}</h1>`
}