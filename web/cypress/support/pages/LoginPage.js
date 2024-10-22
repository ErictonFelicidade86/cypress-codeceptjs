class LoginPage {
    go(){
        cy.visit('http://localhost:3000');
    }
    fill(user) {
        if( (user.email) && (user.password) ){
            cy.get('#email').clear().type(user.email);
            cy.get('#password').clear().type(user.password);
        }   
    }
    submit(){
        cy.contains('button', 'Entrar').click();
    }
       
    doLogin(user){
        this.go();
        this.fill(user);
        this.submit();
    }
    
    popUpHave(text){
        cy.get('#swal2-content').should('be.visible').should('have.text', text);
    }

    popUpBack(){
        cy.get('.swal2-cancel').click();
    }
}

export default new LoginPage();