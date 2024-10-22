import navbar from "./components/NavBar"

class StudentPage {

    constructor(){
        this.navbar = navbar
    }

    goToRegister(){
        cy.get('a[href="/students/new"]').click()
    }

    submitForm(student){
        if(student.name) cy.get('input[name=name]').type(student.name)
        if(student.email) cy.get('input[name=email]').type(student.email)
        if(student.age) cy.get('input[name=age]').type(student.age)
        if(student.weight) cy.get('input[name=weight]').type(student.weight)
        if(student.feet_tall) cy.get('input[name=feet_tall]').type(student.feet_tall)

        cy.contains('button', 'Cadastrar').should('be.visible').click() //button
    }

    requiredMessage(label, text){
         //label[text()="Nome completo"]/..//span
         cy.contains('label', label).parent().find('span').should('have.text', text)
    }

    popUpHave(expectedText){
        cy.get('#swal2-content').should('be.visible').should('have.text', expectedText)
    }

    search(student) {
        cy.get('input[placeholder="Buscar por nome"]').type(student.name)
        cy.contains('tr', student.email, {timeout: 10000}).find('button').click()
    }
    
    delete(){
        cy.contains('button', 'Confirmar').should('be.visible').click()
    }

    sucess() {
        cy.contains('button', 'OK').should('be.visible').click()
    }
}


export default new StudentPage()