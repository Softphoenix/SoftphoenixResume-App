
class Employee {
    constructor(firstName, lastName, cv, skills, experience, language,  dob, education, email, number, linkedln, website) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cv = cv;
        this.skills = skills;
        this.experience = experience;
        this.language = language;
        this.dob = dob;
        this.education = education;
        this.email = email;
        this.number = number;
        this.linkedln = linkedln;
        this.website = website;

    }
}

class Soft {
    static displayEmployees(){
        const employees = Store.getEmployees()
        employees.forEach( (employee) => Soft.addEmployee(employee));
    }

    static addEmployee(employee){
        const list = document.getElementById('employees')
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td> 
        <td>${employee.cv}</td> 
        <td>${employee.skills}</td>
        <td>${employee.experience}</td>     
        <td>${employee.language}</td>     
        <td>${employee.dob}</td>
        <td>${employee.education}</td>
        <td>${employee.email}</td>
        <td>${employee.number}</td>
        <td>${employee.linkedln}</td>
        <td>${employee.website}</td>
        <td><a class='btn btn-danger btn-sm delete' href="#">X</a></td>`;
        list.appendChild(row);
        
    }
    static deleteEmployee(el){
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
            Soft.showAlert('Resume deleted successfully', 'danger')
        }
    }
    static clearForm() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = ''; 
        document.getElementById('cv').value = ''; 
        document.getElementById('skills').value = '';
        document.getElementById('experience').value = '';
        document.getElementById('language').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('education').value = '';
        document.getElementById('email').value = '';
        document.getElementById('number').value = '';
        document.getElementById('linkedln').value = '';
        document.getElementById('website').value = '';
    }
    static showAlert(message, className) {
        if (document.querySelector('.alert')){
            document.querySelector('.alert').remove()
        }
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#contain')
        container.insertBefore(div, form)

        setTimeout(() => {
            div.remove()
        }, 4000)
    }
}

class Store {
    static getEmployees() {
      let employees;
      if (localStorage.getItem('employees') === null) {
        employees = [];
      } else {
        employees = JSON.parse(localStorage.getItem('employees'));
      }
      return employees;
    }
    static addEmployee(employee) {
        const employees = Store.getEmployees();
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees))
    }
    
    static deleteEmployee(firstName) {
        const employees = Store.getEmployees();
        employees.map((employee, index) => {
            if (employee.website === firstName) {
                employees.splice(index, 1);
            }
        });
        localStorage.setItem('employees', JSON.stringify(employees));
    }
}

document.addEventListener('DOMContentLoaded', Soft.displayEmployees);

document.getElementById('contain').addEventListener('submit', (e) => {
    e.preventDefault()
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const cv = document.getElementById('cv').value
    const skills = document.getElementById('skills').value
    const experience = document.getElementById('experience').value
    const language = document.getElementById('language').value
    const dob = document.getElementById('dob').value
    const education = document.getElementById('education').value
    const email = document.getElementById('email').value
    const number = document.getElementById('number').value
    const linkedln = document.getElementById('linkedln').value
    const website = document.getElementById('website').value

    if (firstName === '' || lastName === '' || cv === '' || skills  === '' || experience === '' || language === '' || dob === '' || education ===  '' || email === '' || number === '' || linkedln === '' || website === '') {
        Soft.showAlert('Please fill in all space', 'danger')
    } else {
        const employee = new Employee(firstName, lastName, cv, skills, experience, language, dob, education, email, number, linkedln, website)
        Soft.addEmployee(employee)
        Store.addEmployee(employee)
        Soft.showAlert('Resume submited successfully', 'success')
        Soft.clearForm()
    }
})

document.getElementById('employees').addEventListener('click', (e) => {
    Soft.deleteEmployee(e.target)

    Store.deleteEmployee(e.target.parentElement.previousElementSibling.textContent)
})