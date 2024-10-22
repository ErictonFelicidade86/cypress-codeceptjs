import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'

describe('Alunos', () => {

    it('Deve poder cadastrar um novo aluno', () => {
        
        const student = students.create

        cy.task('deleteStudent', student.email)
       
        cy.adminLogin()
        
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popUpHave('Dados cadastrados com sucesso.')
    })

    it('Não deve cadastrar com email duplicado', ()=> {
        const student = students.duplicate

        cy.task('resetStudent', student)
       
        cy.adminLogin()
        
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popUpHave('O email informado já foi cadastrado!')
    })

    it('Deve remover um aluno sem matricula', () => {
        const student = students.remove

        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.search(student)

        studentPage.popUpHave('Se você confirmar, o registro será permanentemente removido e essa ação não poderá ser desfeita.')
        studentPage.delete()
        studentPage.sucess()
        studentPage.popUpHave('Exclusão realizada com sucesso.')
    })

    it.only('Todos os campos são obrigatórios', () => {

        const student = students.required
        
        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

       studentPage.requiredMessage('Nome completo', 'Nome é obrigatório')
       studentPage.requiredMessage('E-mail', 'O email é obrigatório')
       studentPage.requiredMessage('Idade', 'A idade é obrigatória')
       studentPage.requiredMessage('Peso (em kg)', 'O peso é obrigatório')
       studentPage.requiredMessage('Altura', 'A altura é obrigatória')

        cy.contains('span', 'Nome é obrigatório').should('be.visible')
            
    })
    
});